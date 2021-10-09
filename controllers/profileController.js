// const jwt = require('jsonwebtoken');
const { User } = require('../models');

//====================getListById
exports.getProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findAll({ where: { id, userId: req.user.id } });
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
    const [rows] = await List.update(
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
        password,
        picurl,
      },
      {
        where: {
          id,
          userId: req.User.id,
        },
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
