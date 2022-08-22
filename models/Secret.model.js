
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

const Secret = model('secret', secretSchema);

<<<<<<< HEAD
module.exports = Secret;
=======

module.exports = secret;

>>>>>>> 6986ce34f977cc0b84b3079d7bd811af13a2763e
