const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.getAllStudents = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT s.*, d.name as dept_name, d.code as dept_code
       FROM students s LEFT JOIN departments d ON s.dept_id = d.id
       ORDER BY s.name`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      `SELECT s.*, d.name as dept_name, d.code as dept_code
       FROM students s LEFT JOIN departments d ON s.dept_id = d.id
       WHERE s.id = ? OR s.reg_no = ?`, [id, id]
    );
    if (!rows.length) return res.status(404).json({ message: 'Student not found' });

    const student = rows[0];

    const [subjects]   = await db.query('SELECT * FROM subjects WHERE student_id = ?', [student.id]);
    const [arrears]    = await db.query('SELECT * FROM arrear_details WHERE student_id = ?', [student.id]);
    const [placements] = await db.query('SELECT * FROM placement_details WHERE student_id = ?', [student.id]);

    res.json({ ...student, subjects, arrears, placements });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStudentsByDept = async (req, res) => {
  try {
    const { deptId } = req.params;
    const [rows] = await db.query(
      `SELECT s.*, d.name as dept_name FROM students s
       LEFT JOIN departments d ON s.dept_id = d.id
       WHERE s.dept_id = ? ORDER BY s.name`, [deptId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ─── ADD STUDENT (Admin only) ─────────────────────────────────────────────────
exports.addStudent = async (req, res) => {
  try {
    const {
      reg_no, name, email, dept_id, batch_id,
      current_sem, cgpa, attendance, arrears,
      placement_status, phone, address
    } = req.body;

    // Check required fields
    if (!reg_no || !name || !email) {
      return res.status(400).json({ message: 'reg_no, name and email are required' });
    }

    // Check duplicate
    const [existing] = await db.query(
      'SELECT id FROM students WHERE reg_no = ? OR email = ?', [reg_no, email]
    );
    if (existing.length) {
      return res.status(400).json({ message: 'Student with this reg_no or email already exists' });
    }

    // Insert student
    const [result] = await db.query(
      `INSERT INTO students 
        (reg_no, name, email, dept_id, batch_id, current_sem, cgpa, attendance, arrears, placement_status, phone, address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        reg_no, name, email,
        dept_id || null,
        batch_id || null,
        current_sem || null,
        cgpa || 0.00,
        attendance || 0,
        arrears || 0,
        placement_status || 'Not Placed',
        phone || null,
        address || null
      ]
    );

    const studentId = result.insertId;

    // Create login user for this student (default password: password123)
    const hashedPassword = await bcrypt.hash('password123', 10);
    await db.query(
      'INSERT INTO users (email, password, role, ref_id) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, 'student', studentId]
    );

    res.status(201).json({
      message: 'Student added successfully',
      studentId,
      defaultPassword: 'password123'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ─── DELETE STUDENT (Admin only) ─────────────────────────────────────────────
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Check student exists
    const [rows] = await db.query('SELECT * FROM students WHERE id = ?', [id]);
    if (!rows.length) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const student = rows[0];

    // Delete user login account
    await db.query('DELETE FROM users WHERE email = ?', [student.email]);

    // Delete student (subjects, arrears, placements auto-deleted via ON DELETE CASCADE)
    await db.query('DELETE FROM students WHERE id = ?', [id]);

    res.json({ message: `Student "${student.name}" deleted successfully` });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};