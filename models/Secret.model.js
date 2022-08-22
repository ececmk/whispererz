const { Schema, model } = require('mongoose');

const secretSchema = new Schema(
  {
    secret: {
      type: String,
      required: [true, 'You need to share a secret.'],
    },
  },
  {
    timestamps: true,
  }
);

const secret = model('secret', secretSchema);

module.exports = Room;
