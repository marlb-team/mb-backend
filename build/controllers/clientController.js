"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);

class ClientController {
  // @route GET admin/user
  // @desc Returns all users
  // @access Public
  async index(req, res) {
    const users = await _user2.default.find({});
    res.status(200).json({ users });
  }

  // @route GET api/user/{id}
  // @desc Returns a specific user
  // @access Public
  async show(req, res) {
    try {
      const id = req.params.id;

      const user = await _user2.default.findById(id);

      if (!user)
        return res.status(401).json({ message: "User does not exist" });

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // @route PUT api/user/{id}
  // @desc Update user details
  // @access Public
  async update(req, res) {
    try {
      const update = req.body;
      const id = req.params.id;
      const user_id = req.user._id;

      //Make sure the passed id is that of the logged in user
      if (user_id.toString() !== id.toString())
        return res.status(401).json({
          message: "Sorry, you don't have the permission to update this data."
        });

      const user = await _user2.default.findByIdAndUpdate(
        id,
        { $set: update },
        { new: true }
      );

      res.status(200).json({ user, message: "User has been updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // @route DESTROY api/user/{id}
  // @desc Delete User
  // @access Public
  async destroy(req, res) {
    try {
      const id = req.params.id;
      const user_id = req.user._id;

      //Make sure the passed id is that of the logged in user
      if (user_id.toString() !== id.toString())
        return res.status(401).json({
          message: "Sorry, you don't have the permission to delete this data."
        });

      await _user2.default.findByIdAndDelete(id);
      res.status(200).json({ message: "User has been deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

exports. default = new ClientController();
