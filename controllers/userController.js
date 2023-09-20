const { User, Thought } = require('../models');

const userController = {
  // get all users
  async getUsers(req, res) {
    try {
      const dbUserData = await User.find()
        .select('-__v')

      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // get user by id

  async getSingleUser(req, res) {
    try {
      const dbUserData = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts');

      if (!dbUserData) {
        return res.status(404).json({ message: "Can't find user with this id" });
      }

      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // update user

  async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      );
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err); 
    }
  },
  
};

module.exports = userController