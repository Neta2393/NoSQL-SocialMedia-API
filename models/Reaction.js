const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionBody: {
    type: String,
    required: true,
    trim: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => new Date(createdAt).toISOString(),
  },
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;

//the intent was to come back to the reaction function but due to time and getting the code to run with the other functions I decided to come back to it at a later time.