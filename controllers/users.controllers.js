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

const logout = (async(req,res)=>{
    const token = req.headers.authorization

    if(!token){
        res.json({message:'Invalid Authorization'})

        jwt.verify(token,process.env.SECRET_KEY,(error,decoded)=>{
            if(error){
                console.log(error)
                res.json({message:'Invalid Token'})
            } else{
                res.json({message:'logout successfull'})
            }
        })
    }


})


const sendMessages = (async(req,res)=>{

    const {sender_id,receiver_id,messages} = req.body

    const messageSuccess = await db('messages').insert({
        sender_id,
        receiver_id,
        messages
    })
    async function sendMail(){
        const transporter = nodemailer.createTransport({
           service:'gmail',
           auth:{
               user:'eklavyasinghparihar7875@gmail.com',
               pass:'qnsqoemikkgsyutn'
           }
        })
   
   
    const mailOptionsMessages = {
        from:'eklavyasinghparihar7875@gmail.com',
        to:'jaybaghel7005@gmail.com',
        subject:'New Notification',
        text:`${sender_id} sent you a message`
    }
    try{
        const result = await transporter.sendMail(mailOptionsMessages)
        console.log('Email sent successfully')
    } catch(error){
        console.log(error)
    }
}
sendMail()
    res.json({message:'message sent successfully'})

})


module.exports = {
    signUp,
    login,
    logout,
    sendMessages
}