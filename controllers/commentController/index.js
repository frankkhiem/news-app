const commentService = require('../../services/commentService');

const createComment = async (req, res) => {
  try {
    const userId = req.userId;
    const { postId, content } = req.body;
    const result = await commentService.createComment({
      postId,
      commentatorId: userId,
      content
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(error.status || 400);
    res.json(error);
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const result = await commentService.deleteComment({ commentId });

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 400);
    res.json(error);
  }
};

module.exports = {
  createComment,
  deleteComment
}
