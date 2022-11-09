const express=require('express');
const router=express.Router();
const{ createPost,likeComment, deletePost}=require('../controller/post');
const { isAuth } = require('../middleware/auth');


router.route('/upload').post(isAuth,createPost)
router.route('/like/:itemid').post(isAuth,likeComment)
router.route('/delete/:id').delete(isAuth,deletePost)



module.exports=router;