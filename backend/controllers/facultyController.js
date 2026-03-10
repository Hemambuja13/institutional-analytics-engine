const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.getAllFaculty = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT f.*, d.name as dept_name, d.code as dept_code
       FROM faculty f LEFT JOIN departments d ON f.dept_id = d.id
       ORDER BY f.name`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      `SELECT f.*, d.name as dept_name, d.code as dept_code
       FROM faculty f LEFT JOIN departments d ON f.dept_id = d.id
       WHERE f.id = ? OR f.emp_id = ?`, [id, id]
    );
    if (!rows.length) return res.status(404).json({ message: 'Faculty not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFacultyByDept = async (req, res) => {
  try {
    const { deptId } = req.params;
    const [rows] = await db.query(
      `SELECT f.*, d.name as dept_name FROM faculty f
       LEFT JOIN departments d ON f.dept_id = d.id
       WHERE f.dept_id = ? ORDER BY f.name`, [deptId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ─── ADD FACULTY (Admin only) ─────────────────────────────────────────────────
exports.addFaculty = async (req, res) => {
  try {
    const {
      emp_id, name, email, dept_id,
      designation, phone, experience
    } = req.body;

    // Check required fields
    if (!emp_id || !name || !email) {
      return res.status(400).json({ message: 'emp_id, name and email are required' });
    }

    // Check duplicate
    const [existing] = await db.query(
      'SELECT id FROM faculty WHERE emp_id = ? OR email = ?', [emp_id, email]
    );
    if (existing.length) {
      return res.status(400).json({ message: 'Faculty with this emp_id or email already exists' });
    }

    // Insert faculty
    const [result] = await db.query(
      `INSERT INTO faculty (emp_id, name, email, dept_id, designation, phone, experience)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        emp_id,
        name,
        email,
        dept_id || null,
        designation || null,
        phone || null,
        experience || 0
      ]
    );

    const facultyId = result.insertId;

    // Create login user for this faculty (default password: password123)
    const hashedPassword = await bcrypt.hash('password123', 10);
    await db.query(
      'INSERT INTO users (email, password, role, ref_id) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, 'faculty', facultyId]
    );

    res.status(201).json({
      message: 'Faculty added successfully',
      facultyId,
      defaultPassword: 'password123'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ─── DELETE FACULTY (Admin only) ─────────────────────────────────────────────
exports.deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    // Check faculty exists
    const [rows] = await db.query('SELECT * FROM faculty WHERE id = ?', [id]);
    if (!rows.length) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    const faculty = rows[0];

    // Delete user login account
    await db.query('DELETE FROM users WHERE email = ?', [faculty.email]);

    // Delete faculty record
    await db.query('DELETE FROM faculty WHERE id = ?', [id]);

    res.json({ message: `Faculty "${faculty.name}" deleted successfully` });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};