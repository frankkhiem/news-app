const express = require('express');

const authMiddleware = require('../../middlewares/auth/auth.middleware');
// const userValidations = require('../../middlewares/validations/user.validation');
const commentController = require('../../controllers/commentController');

const router = express.Router();

// Use middleware checkAuth for authentication user
router.use(authMiddleware.checkAuth);

// API create a comment
router.post('/', commentController.createComment);

// API delete comment by admin
router.delete('/:commentId', authMiddleware.checkIsAdmin, commentController.deleteComment);

module.exports = router;
