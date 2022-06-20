const express = require('express');

const authMiddleware = require('../../middlewares/auth/auth.middleware');
// const userValidations = require('../../middlewares/validations/user.validation');
const postController = require('../../controllers/postController');

const router = express.Router();

// Use middleware checkAuth for authentication user
router.use(authMiddleware.checkAuth);

// API get list posts
router.get('/', postController.getListPosts);

// API get post detail
router.get('/:postId', postController.getPostDetail);

// API create a new post
router.post('/', authMiddleware.checkIsAdmin, postController.createPost);

// API edit a post by postId
router.put('/:postId', authMiddleware.checkIsAdmin, postController.editPost);

// API delete a post by postId
router.delete('/:postId', authMiddleware.checkIsAdmin, postController.deletePost);

module.exports = router;
