const { User, Thought } = require('../models');

const userController = {
  // GET all users
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .populate('thoughts')
      .populate('friends')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // GET a single user by _id
  getUserById(req, res) {
    const { userId } = req.params;
    User.findById(userId)
      .select('-__v')
      .populate('thoughts')
      .populate('friends')
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // POST create a new user
  createUser(req, res) {
    const { username, email } = req.body;
    User.create({ username, email })
      .then((user) => res.json({ message: 'User created successfully' }))
      .catch((err) => res.status(500).json(err));
  },

  // PUT update a user by _id
  updateUser(req, res) {
    const { userId } = req.params;
    const { username, email } = req.body;
    User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true, runValidators: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User updated successfully' });
      })
      .catch((err) => res.status(500).json(err));
  },

  // DELETE a user by _id
  deleteUser(req, res) {
    const { userId } = req.params;
    User.findByIdAndDelete(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        // Remove user's thoughts
        return Thought.deleteMany({ username: user.username });
      })
      .then(() => res.json({ message: 'User and associated thoughts deleted successfully' }))
      .catch((err) => res.status(500).json(err));
  },

  // POST add a friend to user's friend list
  addFriend(req, res) {
    const { userId, friendId } = req.params;
    User.findByIdAndUpdate(userId, { $push: { friends: friendId } }, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Friend added successfully' });
      })
      .catch((err) => res.status(500).json(err));
  },

  // DELETE remove a friend from user's friend list
  removeFriend(req, res) {
    const { userId, friendId } = req.params;
    User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Friend removed successfully' });
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;
