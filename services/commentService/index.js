const createError = require("http-errors");

const Comment = require('../../models/Comment');

const getCommentsInPost = async ({ postId }) => {
  try {
    let comments = await Comment.find({ post: postId })
      .populate('commentator', [
        '_id',
        'fullname'
      ])
      .select({ post: 0 });

    return comments;
  } catch (error) {
    throw createError(error.statusCode || 500, error.message || 'Internal Server Error');
  }
};

const createComment = async ({ postId, commentatorId, content }) => {
  try {
    const comment = await Comment.create({
      post: postId,
      commentator: commentatorId,
      content
    });

    return {
      message: 'Create comment successfully',
      comment
    }
  } catch (error) {
    throw createError(error.statusCode || 500, error.message || 'Internal Server Error');
  }
};

const deleteComment = async ({ commentId }) => {
  try {
    await Comment.findByIdAndDelete(commentId);

    return {
      success: true,
      message: 'Delete comment successfully'
    }
  } catch (error) {
    throw createError(error.statusCode || 500, error.message || 'Internal Server Error');
  }
};

module.exports = {
  getCommentsInPost,
  createComment,
  deleteComment
}
