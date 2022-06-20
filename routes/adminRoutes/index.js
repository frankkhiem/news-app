const express = require('express');

const authMiddleware = require('../../middlewares/auth/auth.middleware');
// const userValidations = require('../../middlewares/validations/user.validation');
const adminController = require('../../controllers/adminController');

const router = express.Router();

// Use middleware checkAuth and checkIsAdmin for Authorization
router.use(authMiddleware.checkAuth, authMiddleware.checkIsAdmin);

// API test authorization admin
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'you are admin'
  });
});

// API get list users
router.get('/users', adminController.getListUser);

// API get list users
router.get('/users/blocked', adminController.getListUserBlocked);

// API get user detail
router.get('/users/:userId', adminController.getUserDetail);

// API block user
router.patch('/users/:userId/block', adminController.blockUser);

// API unblock user
router.patch('/users/:userId/unblock', adminController.unBlockUser);

module.exports = router;
