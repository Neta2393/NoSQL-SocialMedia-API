const { Thought, User } = require('../models');

const thoughtController = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .sort({ createdAt: -1 })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // GET a single thought by _id
  getThoughtById(req, res) {
    const { thoughtId } = req.params;
    Thought.findById(thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // POST create a new thought
  createThought(req, res) {
    const { thoughtText, username, userId } = req.body;
    Thought.create({ thoughtText, username, userId })
      .then((thought) => {
        return User.findByIdAndUpdate(
          userId,
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then(() => res.json({ message: 'Thought created successfully' }))
      .catch((err) => res.status(500).json(err));
  },

  // PUT update a thought by _id
  updateThought(req, res) {
    const { thoughtId } = req.params;
    const { thoughtText } = req.body;
    Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json({ message: 'Thought updated successfully' });
      })
      .catch((err) => res.status(500).json(err));
  },

  // DELETE a thought by _id
  deleteThought(req, res) {
    const { thoughtId, userId } = req.params;
    Thought.findByIdAndDelete(thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        return User.findByIdAndUpdate(userId, { $pull: { thoughts: thoughtId } });
      })
      .then(() => res.json({ message: 'Thought deleted successfully' }))
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
