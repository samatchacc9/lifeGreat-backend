// const { sequelize } = require('./models');
// sequelize.sync({ alter: true });
require('dotenv').config();
const express = require('express');
const cors = require('cors'); // มันคือ middleware
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');
// const orderItemRoute = require('./routes/orderItemRoute');
const profileRoute = require('./routes/profileRoute');
//=====================================================================================
// ประกาศ ตัวแปร app เก็บ function express
const app = express();
//=====================================================================================
// เรียกใช้
app.use(cors()); // set access * ร้องขอข้าม domain ได้
app.use(express.json());
//=====================================================================================
//ประกาศตัวแปรเก็บ route userAuthenRoute
const userAuthenRoute = require('./routes/userAuthenRoute');

//เรียกใช้ function พร้อมส่งตัวแปรที่เก็บค่า route เข้าไปในฟังก์ชัน Login, Register
app.use('/', userAuthenRoute);
// category CRUD routes
app.use('/category', categoryRoute);
// // product CRUD routes
app.use('/product', productRoute);
// // order CRUD routes
app.use('/order', orderRoute);
// // orderItem CRUD routes
// app.use('/orderItem', orderItemRoute);
// // update profile route
app.use('/profile', profileRoute);

//=====================================================================================
// path not found handing middleware
app.use((req, res, next) => {
  res.status(404).json({ message: 'resource not found on this server' });
});
//=====================================================================================
//error handing middleware
// app.use(errorController);
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
//=====================================================================================
