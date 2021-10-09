const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const fs = require('fs');
const util = require('util');
const cloudinary = require('cloudinary').v2;

const uploadPromise = util.promisify(cloudinary.uploader.upload);

// authenticate
exports.authenticate = async (req, res, next) => {
  try {
    // get request headers
    // const headers = req.headers;
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer')) {
      return res.status(401).json({ message: 'you are unauthorized' });
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'you are unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // decoded { id: , email: , username }

    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ message: 'you are unauthorized' });
    }

    req.user = user;
    req.data = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

// register middleware
exports.register = async (req, res, next) => {
  try {
    // req.body: username ,email, password, confirmPassword
    const { firstName, lastName, email, password, confirmPassword, isAdmin } = req.body;

    // check password match confirm password
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'password and confirm password did not match' });
    }

    if (firstName.trim() === '') {
      return res.status(400).send({ message: 'plz insert firstname' });
    }

    if (lastName.trim() === '') {
      return res.status(400).send({ message: 'plz insert lastname' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await uploadPromise(req.file.path);
    console.log(result);
    const user = await User.create({
      firstName,
      lastName,
      password: hashedPassword,
      email,
      profilePicture: result.secure_url,
    });
    // delete from folder
    fs.unlinkSync(req.file.path);
    res.send({ user });
  } catch (err) {
    next(err);
  }
};

// login middleware
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // SELECT * FROM users WHERE username = username
    const user = await User.findOne({ where: { email } });
    // username not found
    if (!user) {
      return res.status(400).json({ message: 'invalid email or password' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    // password did not match
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'invalid username or password' });
    }

    const payload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePicture: user.profilePicture,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '10d' });
    res.json({ message: 'success logged in', token });
  } catch (err) {
    next(err);
  }
};
