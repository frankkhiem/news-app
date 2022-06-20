const express = require('express');

const authRouter = require('./authRoutes');
const userRouter = require('./userRoutes');
const adminRouter = require('./adminRoutes');
const postRouter = require('./postRoutes');
const commentRouter = require('./commentRoutes');

const router = express.Router();

// Render Home page
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to KHyM Authentication App Template using NodeJS'
  });
});

// Routes for authentication
router.use('/', authRouter);

// Routes for user
router.use('/user', userRouter);

// Routes for admin
router.use('/admin', adminRouter);

// Routes for post
router.use('/posts', postRouter);

// Routes for comments
router.use('/comments', commentRouter);

// Response not found with url not match
router.use('/*', (req, res, next) => {
  res.status(400).json({
    message: 'No service provided for this Endpoint'
  });
});

module.exports = router;
