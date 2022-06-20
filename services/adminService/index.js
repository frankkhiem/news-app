const createError = require("http-errors");

const User = require('../../models/User');

const _getBasicDetailUser = (user) => {
  return {
    userId: user._id,
    fullname: user.fullname,
    email: user.email,
    description: user.description
  }
};

const getListUser = async ({ skip, take, sortProperty, sortType }) => {
  try {
    let sortCondition = {};
    sortCondition[sortProperty] = sortType;

    const users = await User.find({ 
      role: 'user',
      blockedAt: null
    }).limit(take)
      .skip(skip)
      .sort(sortCondition)
      .select(['_id', 'fullname', 'email', 'description']);

    return users;
  } catch (error) {
    throw createError(error.statusCode || 500, error.message || 'Internal Server Error');
  }
};

const getListUserBlocked = async ({ skip, take, sortProperty, sortType }) => {
  try {
    let sortCondition = {};
    sortCondition[sortProperty] = sortType;

    const users = await User.find({ 
      role: 'user',
      blockedAt: {
        $ne: null
      }
    }).limit(take)
      .skip(skip)
      .sort(sortCondition)
      .select(['_id', 'fullname', 'email', 'description']);

    return users;
  } catch (error) {
    throw createError(error.statusCode || 500, error.message || 'Internal Server Error');
  }
};

const getUserDetail = async ({ userId }) => {
  try {
    const user = await User.findOne({
      _id: userId,
      role: 'user'
    });

    if( user ) return {
      ..._getBasicDetailUser(user),
      blocked: user.blockedAt ? true : false
    };

    return {
      message: 'userId is invalid'
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message || 'Internal Server Error');
  }
};

const blockUser = async ({ userId }) => {
  try {
    let user = await User.findOne({
      _id: userId,
      role: 'user'
    });

    if( !user ) throw createError(400, 'userId is invalid');

    user.blockedAt = Date.now();
    await user.save();

    return {
      message: 'Block user successfully!',
      userBlocked: {
        ..._getBasicDetailUser(user),
        blockedAt: user.blockedAt
      }
    }
  } catch (error) {
    throw createError(error.statusCode || 500, error.message || 'Internal Server Error');
  }
};

const unBlockUser = async ({ userId }) => {
  try {
    let user = await User.findOne({
      _id: userId,
      role: 'user'
    });

    if( !user ) throw createError(400, 'userId is invalid');

    user.blockedAt = null;
    await user.save();

    return {
      message: 'UnBlock user successfully!',
      userUnBlocked: {
        ..._getBasicDetailUser(user),
        blockedAt: user.blockedAt
      }
    }
  } catch (error) {
    throw createError(error.statusCode || 500, error.message || 'Internal Server Error');
  }
};

module.exports = {
  getListUser,
  getListUserBlocked,
  getUserDetail,
  blockUser,
  unBlockUser
};
