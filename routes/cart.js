const express=require('express');
const router=express.Router();
const{addcart,removecart,showcart}=require('../controller/cart');
const { isAuth } = require('../middleware/auth');


router.route('/addcart').post(addcart)
router.route('/showcart').post(showcart)
router.route('/delete/:id').delete(isAuth,removecart)



module.exports=router;