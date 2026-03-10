const router  = require('express').Router();
const ctrl    = require('../controllers/facultyController');
const protect = require('../middleware/auth');

// Existing routes
router.get('/',             protect(['admin']),           ctrl.getAllFaculty);
router.get('/:id',          protect(['admin', 'faculty']),ctrl.getFaculty);
router.get('/dept/:deptId', protect(['admin', 'faculty']),ctrl.getFacultyByDept);

// Admin only routes
router.post('/',       protect(['admin']), ctrl.addFaculty);
router.delete('/:id',  protect(['admin']), ctrl.deleteFaculty);

module.exports = router;