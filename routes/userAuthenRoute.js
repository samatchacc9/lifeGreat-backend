const userAuthenController = require('../controllers/userAuthenController');
const router = require('express').Router();
const { upload } = require('../middleware/uploadfile');

router.post('/register', upload.single('picurl'), userAuthenController.register);
router.post('/login', userAuthenController.login);

// router.get('/', customerController.getAllCustomers);
// router.get('/:id', customerController.getCustomerById);
// router.post('/', customerController.createCustomer);
// router.put('/:id', customerController.updateCustomer);
// router.delete('/:id', customerController.deleteCustomer);

//========== Admin ========== มี 8 หน้า

//* method get

//(1) AdminManageCategory
//(2) AdminManageProduct
//(3) AdminManageOrder

//* method post
//(1) AdminAddCategory
//(2) AdminAddProduct

//*method put
//(1) AdminUpdateCategory
//(2) AdminUpdateProduct
//(3) AdminUpdateOrder

//*method delete
//(1) AdminManageCategory
//(2) AdminManageProduct
//(3) AdminManageOrder

//========== Customer ========== มีทั้งหมด 9 หน้า ตัด register ออกเหลือ 8 หน้า

//* method get
//(1) CustomerProduct (ดึงภาพ product มาแสดง)
//(2) CustomerOrder
//(2) CustomerProfile

//* method post
//(1) CustomerPayment

//* method put
//(1) CustomerPayment

//(2) CustomerPayment

//(3) CustomerProfileUpdate

//========== GUEST ==========

//* method get
// 1 Home

module.exports = router;
