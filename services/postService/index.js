const createError = require("http-errors");

const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const commentService = require('../commentService');

const getListPosts = async ({ skip, take, recent = true }) => {
  try {
    let posts = await Post.find()
      .limit(take)
      .skip(skip)
      .sort({
        updatedAt: recent ? -1 : 1
      });

    return posts;
  } catch (error) {
    throw createError(error.statusCode || 500, error.message || 'Internal Server Error');
  }
};

const getPostDetail = async ({ postId }) => {
  try {
    let post = await Post.findById(postId);

    const comments = await commentService.getCommentsInPost({ postId });

    post._doc.comments = comments;

    return post;
  } catch (error) {
    throw createError(error.statusCode || 500, error.message || 'Internal Server Error');
  }
};

const createPost = async ({ title, content }) => {
  try {
    let newPost = new Post({
      title,
      content
    });    
    await newPost.save();
    
    return {
      message: 'Create new post successfully!',
      post: newPost
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message || 'Internal Server Error');
  }
};

const updatePost = async ({ postId, title, content }) => {
  try {
    let post = await Post.findById(postId);
    post.title = title;
    post.content = content;
    await post.save();

    return {
      message: 'Update post successfully!',
      post
    }
  } catch (error) {
    throw createError(error.statusCode || 500, error.message || 'Internal Server Error');    
  }
};

const deletePost = async ({ postId }) => {
  try {
    await Post.findByIdAndDelete(postId);

    return {
      message: 'Delete post successfully!'
    }
  } catch (error) {
    throw createError(error.statusCode || 500, error.message || 'Internal Server Error');    
  }
};

module.exports = {
  getListPosts,
  getPostDetail,
  createPost,
  updatePost,
  deletePost
};
