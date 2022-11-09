const userData = require('../models/user')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const user = require('../models/user');


exports.register = async (req, res) => {

    const { name, email, password } = req.body;

    try {



        const User = await userData.findOne({ email })


        if (User) {
            return res.status(400).json({ message: "user already exit" })
        }
        else {

            const data = await userData.create({
                name,
                avtar: {
                    public_id: "publicID",
                    url: "thtt://veea.com"
                },
                email,
                password

            })

        }


        //login after register 

        const user = await userData.findOne({ email })
        console.log(user)

        if (!user) {

            return res.status(400).json({
                success: false,
                message: "user not found"
            })

        }


        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                success: "fail",
                message: "wrong password"

            })
        }

        const token = jwt.sign({
            _id: user._id
        },
            process.env.JWT_SEC
        )

        const option = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true

        }


        res.status(201).cookie("token", token, option).json({
            success: true,
            data: user,
            token
        })





    } catch (error) {

        res.status(500).json({
            message: error
        })

    }


}

//login 

exports.login = async (req, res) => {

    const { email, password } = req.body;

    const user = await userData.findOne({ email })

    if (!user) {

        return res.status(400).json({
            success: false,
            message: "user not found"
        })



    }


    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).json({
            success: "fail",
            message: "wrong password"

        })
    }

    const token = jwt.sign({
        _id: user._id
    },
        process.env.JWT_SEC
    )

    const option = {
        expires: Date.now + 90 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
    res.status(200).cookie("token", token, option).json({
        success: true,
        data: user,
        token
    })




}


exports.follow = async (req, res) => {

    const { id } = req.params

    try {
        const follUsr = await user.findById(id)
        if (follUsr) {
            const User = await user.findById(req.user._id)

            const indexF = (arr, arg) => {
                for (let index = 0; index < arr.length; index++) {
                    if (arr[index] === arg) {
                        return index;
                    }

                }
            }





            if (User.following.includes(follUsr._id)) {


                const index = indexF(User.following, follUsr._id)
                const indexFoll = indexF(User.following, follUsr._id)

                User.following.splice(index, 1)
                await User.save();

                follUsr.followers.splice(index, 1)
                await follUsr.save();

                res.status(200).json({
                    success: true,
                    message: "unfollow"
                })


            } else {
                User.following.push(follUsr._id)
              await  User.save();

                follUsr.followers.push(User._id)
               await follUsr.save();

                res.status(200).json({
                    success: true,
                    message: "follow"
                })
            }

        }


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error
        })

    }

}


exports.logout=(req,res)=>{

    try {
        res.status(200).cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
        }).json({
            success:true,
            message:"succesfully logout"
        })

        
    } catch (error) {

        res.status(500).json({
            success:false,
            message:error
        })
        
    }

}

exports.updatePassword=async(req,res)=>{

    try {

        const {newpassword,oldpassword} =req.body;
        const User=user.findById(req.user._id)

        const isMatch = await bcrypt.compare(User.password,oldpassword)

        if(!isMatch){
            res.status(300).json({
                success:false,
                message:"old password wrong"
            })
        }else{

            User.password=newpassword;
            await User.save()


            res.status(200).json({
                success:true,
                message:"password updated"
            })

        }


        
    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }

}

exports.nameEmail=(req,res)=>{
    try {

        const {name,email} =req.body;
        const User=user.findById(req.user._id)

        if(name){
            User.name=name;
            User.save()
        }

        if(email){
            User.email=email;
            User.save()
        }

        res.status(200).json({
            success:true,
            message:"updated"
        })


        
    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

