const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const Token = require("../models/token.model");

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
      let token = jwt.sign(payload, "randomString", {
        expiresIn: 10000
      });

      var tokenObject = new Token({
        userId: user._id,
        token: token
      });
      tokenObject.save();

      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "khanh281096@gmail.com",
          pass: "password"
        }
      });
      let info = await transporter.sendMail({
        from: '"KhanhPT👻" <khanh281096@gmail.com>',
        to: username,
        subject: "Confirm register new account",
        text: token,
        html: token
      });

      console.log("Message sent: %s", info.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      res.status(200).json({
        status: 200,
        message: "A verification email has been sent to " + user.username
      });
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
        return res.status(404).json({
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
      if (!account.isVerify) {
        return res.status(401).json({
          status: 401,
          error: "Your account has not been verified."
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
  },
  delete: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({
          status: 404,
          error: "User not found"
        });
      } else {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({
          status: 200,
          message: "Deleted successfully"
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: "Server error"
      });
    }
  },

  confirmation: async (req, res) => {
    try {
      var token = await Token.findOne({ token: req.body.token });
      if (!token) {
        return res.status(400).json({
          status: 400,
          error:
            "We were unable to find a valid token. Your token my have expired."
        });
      }

      var user = await User.findOne({
        _id: token.userId,
        username: req.body.username
      });
      if (!user) {
        return res.status(400).json({
          status: 400,
          error: "We were unable to find a user for this token."
        });
      }

      if (user.isVerify) {
        return res.status(400).json({
          status: 400,
          error: "This user has already been verified."
        });
      }

      user.isVerify = true;
      user.save();
      res.status(200).json({
        status: 200,
        message: "The account has been verified. Please log in."
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: "Server error"
      });
    }
  }
};
