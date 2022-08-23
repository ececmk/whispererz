
const { Schema, model } = require('mongoose');

const secretSchema = new Schema(
  {
    secret: {
      type: String,
      required: [true, 'You need to share a secret.'],
    },
    owner: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true,
  }
);

const Secret = model('secret', secretSchema);

module.exports = Secret;

