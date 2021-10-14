const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const fs = require('fs');
const util = require('util');
const cloudinary = require('cloudinary').v2;

const uploadPromise = util.promisify(cloudinary.uploader.upload);

//ตรวจสอบ token
exports.authenticate = async (req, res, next) => {
  try {
    //get request header

    // const headers = req.headers;
    // console.log(headers);

    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer')) {
      return res.status(401).json({ message: 'you are unauthorized' });
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'you are unauthorized' });
    }

    //ถอด
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // decosded เป็น obj {id, email: , username}

    const user = await User.findOne({ where: { id: decoded.id } }); //หา user

    if (!user) {
      return res.status(401).json({ message: 'you are unauthorized' });
    }

    // กรณีเจอ เพิ่มค่าใน obj ที่เป็น Global object ที่ตัวอื่นแรกใช้ได้เรียกใน middleware ตัวอื่นในหน้า Route
    req.user = user;
    req.data = decoded;
    next();
  } catch (err) {
    // console.log(err.name);
    next(err);
  }
};

// register
exports.register = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      dateofbirth,
      phone,
      email,
      role,
      gender,
      province,
      district,
      subdistrict,
      houseno,
      village,
      zipcode,
      username,
      password,
      picurl,
    } = req.body;

    // function แปลงข้อมูล password
    const hasedPassword = await bcrypt.hash(password, 12);
    const result = await uploadPromise(req.file.path);
    fs.unlinkSync(req.file.path);
    // console.log(result);
    //create data in database
    const user = await User.create({
      firstname,
      lastname,
      dateofbirth,
      phone,
      gender,
      email,
      role,
      province,
      district,
      subdistrict,
      houseno,
      village,
      zipcode,
      username,
      password: hasedPassword,
      picurl: result.secure_url,
    });
    res.send({ user });
  } catch (err) {
    next(err);
  }
};

// login
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // SELECT * FROM users WHERE username = username
    const user = await User.findOne({ where: { username: username } });
    //username not found
    if (!user) {
      return res.status(400).json({ message: 'invalid username or password' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    //password did not match
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'invalid username or password' });
    }

    const payload = {
      id: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      dateofbirth: user.dateofbirth,
      phone: user.phone,
      gender: user.gender,
      email: user.email,
      role: user.role,
      province: user.province,
      district: user.district,
      subdistrict: user.subdistrict,
      houseno: user.houseno,
      village: user.village,
      zipcode: user.zipcode,
      picurl: user.picurl,
    };
    // const secretKey = 'SECRET_KEY';
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 * 30 }); //'30d'
    // const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 3600 }); //5s
    res.json({ message: 'login sccess logged in', token });
  } catch (err) {
    next(err);
  }
};
