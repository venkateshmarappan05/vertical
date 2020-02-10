const express = require('express');
const router = express.Router();
const leaveController = require('../controller/leaveController');

router.route('/leaveForm').post(leaveController.leaveForm);
router.route('/leaveShow').post(leaveController.leaveShow);



module.exports = router;

