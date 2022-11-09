const express=require('express');
const { ShowPost } = require('../controller/post');
const router=express.Router();
 const {register,login, follow, logout, nameEmail}=require('../controller/user')
 const { isAuth } = require('../middleware/auth')


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/follow/:id').post(isAuth,follow)
router.route('/showpost').get(isAuth,ShowPost)
router.route('/logout').get(isAuth,logout)
router.route('/update').post(isAuth,nameEmail)

module.exports=router;