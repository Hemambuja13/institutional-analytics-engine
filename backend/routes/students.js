const router = require('express').Router();
const ctrl   = require('../controllers/studentController');
const protect = require('../middleware/auth');

// Existing routes
router.get('/',            protect(['admin', 'faculty']),           ctrl.getAllStudents);
router.get('/dept/:deptId',protect(['admin', 'faculty']),           ctrl.getStudentsByDept);
router.get('/:id',         protect(['admin', 'faculty', 'student']),ctrl.getStudent);

// Admin only routes
router.post('/',           protect(['admin']), ctrl.addStudent);
router.delete('/:id',      protect(['admin']), ctrl.deleteStudent);

module.exports = router;