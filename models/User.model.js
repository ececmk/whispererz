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
    secret: {
      type: String,
      required: [true, 'You need to share a secret before reading others'],
    },
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
