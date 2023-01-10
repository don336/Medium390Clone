import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import User from "../model/user.js";

class UserController {
  static async registerUser(req, res) {
    const { name, username, email, password } = req.body;

    const user__email = await User.findOne({ email });

    if (user__email) {
      return res.status(409).json({ message: "Email has been taken" });
    }

    const user__username = await User.findOne({ username });

    if (user__username) {
      return res.status(409).json({ message: "Username has been taken" });
    }

    const salt = await bcrypt.genSalt(8);

    const encrypted_ps = await bcrypt.hash(password, salt);
    try {
      const user = await User.create({
        id: uuidv4(),
        name,
        username,
        email,
        password: encrypted_ps,
      });

      return res.status(201).json({
        message: "User Registered",
        user,
      });
    } catch (err) {
      return res.status(400).json({
        msg: err,
      });
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          Error: "Email doesn't Exist!",
        });
      }
      const passCheck = await bcrypt.compare(password, user.password);
      if (!passCheck) {
        return res
          .status(401)
          .json({ Error: "Please Check Email or Password" });
      }
      const token = Jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

      res.cookie("token", token, { expire: new Date() + 1 });

      const { _id, username } = user;

      return res.status(201).json({
        token,
        user: {
          _id,
          username,
          email,
        },
      });
    } catch (err) {
      return res.status(400).json({
        Error: "Check your registration and try again",
        err: err,
      });
    }
  }

  static signOut(req, res) {
    res.clearCookie("token");
    return res.json({
      message: "User has signed out!",
    });
  }

  static async getUserProfile(req, res) {
    const { id } = req.params;
    const foundUser = await User.findById({ _id: id });

    if (!foundUser) {
      return res.status(400).json({
        msg: "User doesn't exist",
      });
    }
    const { name, username, email, bio } = foundUser;
    return res.status(200).json({
      name,
      username,
      email,
      bio,
    });
  }

  static async updateUserProfile(req, res) {
    const { id } = req.params;

    const foundUser = await User.findById({ _id: id });
    if (!foundUser) {
      return res.status(400).json({
        msg: "User doesn't exist",
      });
    }
    try {
      const {username, email, bio, name} = req.body
      const updatedProfile = await User.updateOne(
          {_id:id},
          {$set: {
            username,
            email,
            bio,
            name
          }},
        { new: true }
      );

      return res.status(201).json({
        message: "Profile Updated!",
        updatedProfile,
      });
    } catch (err) {
      // return res.status(400).json({
        
      // });
      console.log(err);
    }
  }
}

export default UserController;
