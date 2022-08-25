const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      trim: true,
    },
    /*credit: {
      type: Number,
    },*/
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
