const userSchema = require("../models/UserModel")
const bcrypt = require("bcrypt")

const registerUser = async(req,res)=>{

    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10)          // encrypt password

        const savedUser = await userSchema.create({...req.body,password:hashedPassword})
        
        await mailSend(savedUser.email,"Welcome to our app","Thank you for registering with our app.")

        res.status(201).json({
            message:"user created successfully",
            data:savedUser
        })

    }catch(err){
        res.status(500).json({
            message:"error while creating user",
            err:err
        })
    }
}

const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body

        const foundUserFromMail = await userSchema.findOne({email:email})

        if(foundUserFromMail){
            const isPasswordMatched = await bcrypt.compare(password,foundUserFromMail.password)

            if(isPasswordMatched){
                res.status(200).json({
                    message:"Login Successfully",
                    data:foundUserFromMail,
                    role:foundUserFromMail.role

                })
            }else{
                res.status(401).json({
                    message:"Invalid Credentials"
                })
            }
        }else{
            res.status(404).json({
                message:"User not found"
            })
        }

    }catch(err){
        res.status(500).json({
            message:"error while logging in",
            err:err
        })
    }
}

module.exports ={
    registerUser,loginUser
}