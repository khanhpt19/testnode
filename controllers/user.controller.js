const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    const { username, password } = req.body;
    if (!username) {
      return res.status(400).json({
        status: 400,
        error: "Username must be not null"
      });
    }
    if (!password) {
      return res.status(400).json({
        status: 400,
        error: "Password must be not null"
      });
    }
    try {
      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({
          status: 400,
          error: "User Already Exists"
        });
      }
      user = new User({
        username,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          username: user.username
        }
      };
      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            status: 200,
            message: "OK",
            user: user,
            token: token
          });
        }
      );
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: "Server error"
      });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (username == "") {
        return res.status(400).json({
          status: 400,
          error: "Username must be not null"
        });
      }

      if (password == "") {
        return res.status(400).json({
          status: 400,
          error: "Password must be not null"
        });
      }

      let account = await User.findOne({ username });

      if (!account) {
        return res.status(200).json({
          status: 404,
          error: "User not found"
        });
      }

      const isMatch = await bcrypt.compare(password, account.password);
      if (!isMatch) {
        return res.status(400).json({
          status: 400,
          error: "Incorrect password!"
        });
      }
      const payload = {
        user: {
          username: account.username
        }
      };

      jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({
            status: 200,
            message: "OK",
            user: account,
            token: token
          });
        }
      );
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: "Server error"
      });
    }
  },

  getAll: async (req, res) => {
    const users = await User.find();
    return res.status(200).json({
      status: "200",
      message: "OK",
      users: users
    });
  }
};
