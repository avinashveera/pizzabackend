const express=require('express');
const { showcart } = require('../controller/cart');
const router=express.Router();
 const {register,login, follow, logout, nameEmail}=require('../controller/user')
 const { isAuth } = require('../middleware/auth')


router.route('/register').post(register)
router.route('/login').post(login)

router.route('/cart').get(showcart)
router.route('/logout').get(isAuth,logout)


router.route('/update').post(isAuth,nameEmail)
router.route('/follow/:id').post(isAuth,follow)

module.exports=router;