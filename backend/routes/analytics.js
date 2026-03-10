const router  = require('express').Router();
const ctrl    = require('../controllers/analyticsController');
const protect = require('../middleware/auth');

router.get('/overview',       protect(['admin','faculty']), ctrl.getOverview);
router.get('/dropout-risk',   protect(['admin','faculty']), ctrl.getDropoutRisk);
router.get('/heatmap',        protect(['admin','faculty']), ctrl.getHeatmap);
router.get('/placement-funnel', protect(['admin','faculty']), ctrl.getPlacementFunnel);
router.get('/alerts',         protect(['admin','faculty']), ctrl.getAlerts);

module.exports = router;