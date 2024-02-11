const jwt = require('jsonwebtoken')
const db = require('../db/db.js')
const bcrypt = require('bcrypt')
const authenticateToken = require('../middlewares/auth.middleware.js')
const nodemailer = require('nodemailer')




const signUp = (async(req,res)=>{
    try{
        const{ Username,Password,email,bio } = req.body
        const hashedPassword = await bcrypt.hash(Password,16)
        await db('Users').insert({
            Username,
            Password:hashedPassword,
            email
        })
        
        async function sendMail(){
            const transporter = nodemailer.createTransport({
               service:'gmail',
               auth:{
                   user:'eklavyasinghparihar7875@gmail.com',
                   pass:'qnsqoemikkgsyutn'
               }
            })
       
       
        const mailOptions = {
            from:'eklavyasinghparihar7875@gmail.com',
            to:'jaybaghel7005@gmail.com',
            subject:'User Registration Successfull',
            text:'You are successfully registered'
        }
        try{
            const result = await transporter.sendMail(mailOptions)
            console.log('Email sent successfully')
        } catch(error){
            console.log(error)
        }
    }
    sendMail()
        res.json({message:'User registered successfully'})
    
    }catch(error){
        console.log(error)
        res.json({message:'Some Internal Error Occurred'})
    }
    
})

const login = (async(req,res)=>{
    try{
        const{ Username,Password } = req.body
        if(!Username||!Password){
            res.json({message:'PLease Enter Usernamme And Password'})
        }
        const user = await db('Users').where({Username}).first()
        const passwordMatch = await bcrypt.compare(Password,user.Password)

        if(user&&passwordMatch){
            const token = jwt.sign({userId:user.id,Username:user,username:user.Username},process.env.SECRET_KEY,{expiresIn:'1h'})
            res.json({message:'Login Successfull',token})
        } else{
            res.json({message:'Invalid Credentials'})
        }
    } catch(error){
        console.log(error)
        res.json({message:'Internal Server Occurred'})
    }
})


module.exports = {
    signUp,
    login
}