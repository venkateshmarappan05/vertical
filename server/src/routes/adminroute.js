const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

router.route('/signup').post(adminController.adminsignup);
router.route('/login').post(adminController.adminlogin);
router.route('/empMembers').post(adminController.empMembers);





module.exports = router;

