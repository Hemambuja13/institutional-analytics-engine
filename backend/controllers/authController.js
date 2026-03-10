const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length)
      return res.status(401).json({ message: 'Invalid credentials' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: 'Invalid credentials' });

    // Get profile based on role
    let profile = {};
    if (user.role === 'student') {
      const [s] = await db.query(
        `SELECT s.*, d.name as dept_name, d.code as dept_code
         FROM students s LEFT JOIN departments d ON s.dept_id = d.id
         WHERE s.id = ?`, [user.ref_id]);
      profile = s[0] || {};
    } else if (user.role === 'faculty') {
      const [f] = await db.query(
        `SELECT f.*, d.name as dept_name, d.code as dept_code
         FROM faculty f LEFT JOIN departments d ON f.dept_id = d.id
         WHERE f.id = ?`, [user.ref_id]);
      profile = f[0] || {};
    } else {
      profile = { name: 'Admin', email: user.email };
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, ref_id: user.ref_id },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, role: user.role, profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};