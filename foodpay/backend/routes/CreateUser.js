const express = require('express');
const router = express.Router();

const User = require("../models/User")

const { body, validationResult } = require('express-validator');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "12345678901234567890123456789012"

router.post("/createuser",[
    body("email").isEmail(),
    body("password", "Bad/short password").isLength({min: 5}),
    body("name").isLength({min: 5}),
],

async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password,salt)

    try {
        await User.create({
            name: req.body.name,
            location:req.body.location,
            email: req.body.email,
            password: secPassword
        })
    res.json({success: true})    

    } catch (error) {
        console.log(error)
        res.json({success: false}) 
    }
})



router.post("/loginuser",[
    body("email").isEmail(),
    body("password", "Bad/short password").isLength({min: 5})],
    
    async(req,res)=>{
    
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

    const {email , password} = req.body;
    try {
        let userData = await User.findOne({email})
        if (!userData){
            return res.status(400).json({errors: "Enter your correct2 credentials"});
        }

        const pwdCompare = await bcrypt.compare(password, userData.password);

        if(!pwdCompare){
            return res.status(400).json({errors: "Enter your correct3 credentials"});
        }   

        const data = {
            user: {
            id: userData.id
        }}

        const authToken = jwt.sign(data, jwtSecret);

        res.json({success: true, authToken: authToken}) 

    } catch (error) {
        console.log(error)
        res.json({success: false}) 
    }
})

module.exports = router;