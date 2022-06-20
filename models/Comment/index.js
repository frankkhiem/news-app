const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  commentator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: String,
},
{
  collection: 'comments',
  timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
