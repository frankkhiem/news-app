const adminService = require('../../services/adminService');

const getListUser = async (req, res) => {
  try {
    const { skip, take, sortProperty, sortType } = req.query;

    const result = await adminService.getListUser({ skip, take, sortProperty, sortType });

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 400);
    res.json(error.message);
  }
};

const getListUserBlocked = async (req, res) => {
  try {
    const { skip, take, sortProperty, sortType } = req.query;

    const result = await adminService.getListUserBlocked({ skip, take, sortProperty, sortType });

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 400);
    res.json(error.message);
  }
};

const getUserDetail = async (req, res) => {
  try {
    const userId = req.params.userId;

    const result = await adminService.getUserDetail({ userId });

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 400);
    res.json(error.message);
  }
};

const blockUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const result = await adminService.blockUser({ userId });

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 400);
    res.json(error);
  }
};

const unBlockUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const result = await adminService.unBlockUser({ userId });

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 400);
    res.json(error);
  }
};

module.exports = {
  getListUser,
  getListUserBlocked,
  getUserDetail,
  blockUser,
  unBlockUser
}
