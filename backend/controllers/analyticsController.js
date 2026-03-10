const db = require('../config/db');

exports.getOverview = async (req, res) => {
  try {
    const [[{ totalStudents }]] = await db.query('SELECT COUNT(*) as totalStudents FROM students');
    const [[{ totalFaculty }]]  = await db.query('SELECT COUNT(*) as totalFaculty FROM faculty');
    const [[{ totalDepts }]]    = await db.query('SELECT COUNT(*) as totalDepts FROM departments');
    const [[{ avgCgpa }]]       = await db.query('SELECT ROUND(AVG(cgpa),2) as avgCgpa FROM students');
    const [[{ totalArrears }]]  = await db.query('SELECT SUM(arrears) as totalArrears FROM students');
    const [[{ placed }]]        = await db.query("SELECT COUNT(*) as placed FROM students WHERE placement_status='Placed'");
    const [[{ eligible }]]      = await db.query('SELECT COUNT(*) as eligible FROM students WHERE cgpa >= 6.5');
    const placementRate = totalStudents ? Math.round((placed / totalStudents) * 100) : 0;

    res.json({
      totalStudents, totalFaculty,
      departments: totalDepts,
      activeCourses: 142,
      placementRate,
      totalArrears: totalArrears || 0,
      ongoingEvents: 4,
      internships: 87,
      placed, eligible, avgCgpa,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDropoutRisk = async (req, res) => {
  try {
    const [students] = await db.query(
      `SELECT s.id, s.name, s.reg_no as regNo, s.attendance, s.cgpa, s.arrears,
              s.placement_status, d.code as dept
       FROM students s LEFT JOIN departments d ON s.dept_id = d.id`
    );
    const withRisk = students.map(s => {
      let risk = 0;
      if (s.attendance < 60) risk += 40;
      else if (s.attendance < 75) risk += 25;
      else if (s.attendance < 85) risk += 10;
      if (s.arrears >= 5) risk += 40;
      else if (s.arrears >= 3) risk += 25;
      else if (s.arrears >= 1) risk += 10;
      if (s.cgpa < 5.0) risk += 20;
      else if (s.cgpa < 6.5) risk += 10;
      else if (s.cgpa < 7.5) risk += 5;
      const riskScore = Math.min(risk, 100);
      const trend = riskScore >= 70 ? 'worsening' : riskScore >= 40 ? 'stable' : 'improving';
      return { regNo: s.regNo, name: s.name, dept: s.dept, cgpa: parseFloat(s.cgpa), attendance: s.attendance, arrears: s.arrears, riskScore, trend };
    });
    withRisk.sort((a, b) => b.riskScore - a.riskScore);
    res.json(withRisk);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getHeatmap = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT d.code,
              ROUND(AVG(s.cgpa),2) as cgpa,
              ROUND(AVG(s.attendance),1) as attendance,
              ROUND(AVG(s.arrears),1) as arrears,
              COUNT(CASE WHEN s.placement_status='Placed' THEN 1 END) as placed,
              COUNT(s.id) as total
       FROM departments d LEFT JOIN students s ON d.id = s.dept_id
       GROUP BY d.id, d.code`
    );
    res.json(rows.map(r => ({
      dept: r.code,
      cgpa: parseFloat(r.cgpa) || 0,
      attendance: parseFloat(r.attendance) || 0,
      arrears: parseFloat(r.arrears) || 0,
      placement: r.total ? Math.round((r.placed / r.total) * 100) : 0,
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPlacementFunnel = async (req, res) => {
  try {
    const [[{ total }]]       = await db.query('SELECT COUNT(*) as total FROM students');
    const [[{ eligible }]]    = await db.query('SELECT COUNT(*) as eligible FROM students WHERE cgpa >= 6.5');
    const [[{ applied }]]     = await db.query('SELECT COUNT(DISTINCT student_id) as applied FROM placement_details');
    const [[{ shortlisted }]] = await db.query("SELECT COUNT(DISTINCT student_id) as shortlisted FROM placement_details WHERE status IN ('Shortlisted','Offer')");
    const [[{ offered }]]     = await db.query("SELECT COUNT(DISTINCT student_id) as offered FROM placement_details WHERE status='Offer'");
    res.json([
      { stage: 'Total Students',        count: total,       color: '#63b3ed' },
      { stage: 'Eligible (CGPA ≥ 6.5)', count: eligible,    color: '#9a75ea' },
      { stage: 'Applied',               count: applied,     color: '#f6ad55' },
      { stage: 'Shortlisted',           count: shortlisted, color: '#68d391' },
      { stage: 'Offer Received',        count: offered,     color: '#4fd1c5' },
    ]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAlerts = async (req, res) => {
  try {
    const alerts = [];
    const [lowAtt] = await db.query(
      `SELECT s.name, s.reg_no, s.attendance, d.code as dept
       FROM students s LEFT JOIN departments d ON s.dept_id=d.id
       WHERE s.attendance < 75 ORDER BY s.attendance LIMIT 5`
    );
    lowAtt.forEach(s => alerts.push({
      type: s.attendance < 60 ? 'danger' : 'warning',
      icon: s.attendance < 60 ? '🚨' : '⚠️',
      title: s.attendance < 60 ? 'Critical Attendance' : 'Low Attendance',
      msg: `${s.name} (${s.reg_no}) has ${s.attendance}% attendance`,
      dept: s.dept, time: 'Just now',
    }));
    const [highArr] = await db.query(
      `SELECT s.name, s.reg_no, s.arrears, d.code as dept
       FROM students s LEFT JOIN departments d ON s.dept_id=d.id
       WHERE s.arrears >= 3 ORDER BY s.arrears DESC LIMIT 5`
    );
    highArr.forEach(s => alerts.push({
      type: s.arrears >= 5 ? 'danger' : 'warning',
      icon: '⚠️',
      title: 'High Arrear Count',
      msg: `${s.name} (${s.reg_no}) has ${s.arrears} pending arrears`,
      dept: s.dept, time: '1h ago',
    }));
    res.json(alerts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};