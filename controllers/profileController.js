// const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const util = require('util');
const cloudinary = require('cloudinary').v2;
const { User } = require('../models');
const uploadPromise = util.promisify(cloudinary.uploader.upload);

//====================getListById
exports.getProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      order: [
        'firstname',
        'lastname',
        'dateofbirth',
        'phone',
        'email',
        'role',
        'gender',
        'province',
        'district',
        'subdistrict',
        'houseno',
        'village',
        'zipcode',
        'username',
        'password',
        'picurl',
      ],
    });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

//==============================updateList
exports.updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
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
    //destructuring array index 0
    const hasedPassword = await bcrypt.hash(password, 12);
    const result = await uploadPromise(req.file.path);
    const [rows] = await User.update(
      {
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
        password: hasedPassword,
        picurl: result.secure_url,
      },
      {
        where: { id },
      },
    );
    if (rows === 0) {
      return res.status(400).json({ message: 'fail to update profile' });
    }
    res.status(200).json({ message: 'success update profile' });
  } catch (err) {
    next(err);
  }
};
