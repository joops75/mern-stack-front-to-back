const { Schema, model } = require('mongoose');

const schema = new Schema({
  user: Schema.Types.ObjectId,
  text: {
    type: String,
    required: true
  },
  name: String,
  avatar: String,
  date: {
    type: Date,
    default: Date.now
  },
  likes: [{ user: Schema.Types.ObjectId }],
  comments: [
    {
      user: Schema.Types.ObjectId,
      text: {
        type: String,
        required: true
      },
      name: String,
      avatar: String,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = model('post', schema);
