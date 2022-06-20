const postService = require('../../services/postService');

// [GET] /
const getListPosts = async (req, res) => {
  try {
    let { skip, take, recent } = req.query;

    if( recent != undefined ) {
      recent = true;
    } else {
      recent = false;
    }

    const result = await postService.getListPosts({ skip, take, recent });

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 400);
    res.json(error);
  }
};

// [GET] /:postId
const getPostDetail = async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await postService.getPostDetail({ postId });

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 400);
    res.json(error);
  }
};

// [POST] /
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const result = await postService.createPost({ title, content });

    res.status(201).json(result);
  } catch (error) {
    res.status(error.status || 400);
    res.json(error);
  }
};

// [PUT] /:postId
const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;

    const result = await postService.updatePost({ postId, title, content });

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 400);
    res.json(error);
  }
};

// [DELETE] /:postId
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const result = await postService.deletePost({ postId });

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 400);
    res.json(error);
  }
};

module.exports = {
  getListPosts,
  getPostDetail,
  createPost,
  editPost,
  deletePost
}
