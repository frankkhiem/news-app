const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "Post title is required"]
  },
  content: String,
},
{
  collection: 'posts',
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
