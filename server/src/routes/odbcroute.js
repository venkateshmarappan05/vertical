const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController');

router.route('/empAdd').post(loginController.empAdd);
router.route('/login').post(loginController.login);
router.route('/clock_in').post(loginController.clock_in);
router.route('/clock_out').post(loginController.clock_out);
router.route('/monthly_attendence').post(loginController.monthly_attendence);




module.exports = router;

