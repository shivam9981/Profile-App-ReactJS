const express = require('express')
const route = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwsauthtoken = "SHIVAMGUPTA";
const middleware = require('../middleware/usermiddle')



route.post('/signup', [
    body('name', "Enter your valid name").isLength({ min: 3 }),
    body('email', "Enter your valid Email").isEmail(),
    body('mobile', "Enter your valid number").isLength({ min: 10, max: 10 }),
    body('password', 'Enter your valid password').isLength({ min: 5 })
], async (req, res) => {
    const err = validationResult(req);
    let success = true;
    if (!err.isEmpty()) {
        success = false;
        return res.status(400).json({ error: err.array() });
    }
    try {
        const checkmail = await User.findOne({ email: req.body.email })
        if (checkmail) {
            success = false
            return res.status(400).json({ message: "Email Already Exits" })
        }

        const hsahsolt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(req.body.password, hsahsolt);

        const connect = await User.create({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: passwordHash
        })
        let data = {
            user: {
                _id: connect.id
            }
        }
        // console.log(data)
        const authtoken = jwt.sign(data, jwsauthtoken)
        if (authtoken) {
            res.status(200).json({ authtoken , success })
        }
    } catch (error) {
        console.log(error)
    }
})


route.post('/login', [
    body('email', "Enter valid email").isEmail(),
    body('password', "Enter valid password").isLength({ min: 5 })
], async (req, res) => {
    let success = true
    const err = validationResult(req);
    if (!err.isEmpty()) {
        success = false;
        res.status(400).json({ error: err.array() });
    }
    try {
        const email = req.body.email;
        const checkmail = await User.findOne({email});
        if (!checkmail) {
            success = false;
            return res.status(400).json({ error: "Enter your valid Email and Password" })
        }
        const cpassword = bcrypt.compareSync( req.body.password , checkmail.password  )
        if (!cpassword) {
            success = false
            return res.status(400).json({ error: "Enter your valid Email and Password" })
        }
        let data = {
            _id:checkmail.id
        }
        // console.log(data)
        const authtoken = jwt.sign(data , jwsauthtoken)
        if (authtoken) {
            res.status(200).json({authtoken, success})
        }
        
    } catch (error) {
        console.log(error)
    }
})


route.get('/fatchuser', middleware , async (req,res)=>{
    const userdata = await User.findOne(req.user)
    res.send(userdata)

})

route.post('/sendmessage', middleware ,[
    body('name','Enter your vaid name').isLength({min:3}),
    body('email','Enter your valid email').isEmail(),
    body('mobile','Enter your valid number').isLength({min:10 , max:10}),
    body('textbox','Enter your messege').isLength({min:5})
 ] ,async(req,res)=>{
    let success = true;
    const err = validationResult(req);
    if(!err.isEmpty()){
        success = false
        return res.status(400).json({message:err.array()});
    }
    try {
        const {name, email, mobile , textbox} = req.body;
        const usercontect = await User.findOne({_id:req.user._id})
        if (usercontect) {
            const responsedata = await usercontect.addmessage(name ,email,mobile,textbox)
            await usercontect.save()
            res.json({responsedata , success})
        }

    } catch (error) {
        console.log(error)
    }
})


module.exports = route;