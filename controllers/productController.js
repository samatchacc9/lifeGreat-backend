// const jwt = require('jsonwebtoken');
const { Product } = require('../models');
const { Category } = require('../models');
const util = require('util');
const cloudinary = require('cloudinary').v2;

const uploadPromise = util.promisify(cloudinary.uploader.upload);

//====================getAllProducts
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        require: true,
      },
    });
    res.json({ products });
  } catch (err) {
    next(err);
  }
};

//====================getProductById
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

//====================createProduct

exports.createProduct = async (req, res, next) => {
  try {
    // 1. รับ req ที่ส่งเข้ามาทาง  body
    // const category = req.body;
    // destructuring obj data จาก req ในส่วน body
    const { category, productbrand, productname, productdetail, productprice, productamount, picurl } = req.body;
    //ใช้คำสั่ง squelize สร้างสินค้าลงใน DB
    // console.log('category');
    // console.log(category);
    const result = await uploadPromise(req.file.path, { timeout: 2000000 });
    // const result = await Promise.all(req.files.map((item) => uploadPromise(item.path, { timeout: 200000 })));
    const product = await Product.create({
      productbrand,
      productname,
      productdetail,
      productprice,
      productamount,
      picurl: result.secure_url,
      categoryId: category,
    });
    //respond list ออกไป

    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

//==============================updateCategory
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productbrand, productname, productdetail, productprice, productamount, picurl, categoryId } = req.body;
    //destructuring array index 0
    const [rows] = await Product.update(
      { productbrand, productname, productdetail, productprice, productamount, picurl, categoryId },
      {
        where: {
          id,
        },
      },
    );
    if (rows === 0) {
      return res.status(400).json({ message: 'fail to update product' });
    }

    res.status(200).json({ message: 'success update product' });
  } catch (err) {
    next(err);
  }
};

//==============================deleteList
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await Product.destroy({
      where: {
        id,
      },
    });

    if (rows === 0) {
      return res.status(400).json({ message: 'fail to delete product' });
    }
    res.status(204).json({ message: 'sucess delete product' });
  } catch (err) {
    next(err);
  }
};
