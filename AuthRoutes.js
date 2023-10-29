const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const validation = [body('name', "Enter a valid name").isLength({ min: 1 }), body('email', "Enter a valid email").isEmail(), body('password', "Password must be atleast 8 characters").isLength({ min: 8 })];


const bcrypt=require('bcryptjs');
const JWT = require('jsonwebtoken');
const User = require('../Models/Users');
const JWT_secret = "iNotebook's server";




router.post('/createuser', validation, async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {
        let checkUser = await User.findOne({"email": req.body.email});
        if (checkUser)
            return res.status(400).json({ "error": "User already exists" });

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);


        const newUser = await User.create( {
            "name": req.body.name,
            "email": req.body.email,
            "password": hashedPassword
        });
        const data =await newUser.id;
        console.log(data);

        const JWT_token = JWT.sign(data, JWT_secret);
        return res.status(201).json({
            "User created": "true",
            "authToken" : JWT_token 

        });



    } catch (error) {
        console.log(error);
        return res.status(500).json({ "Error": "Internal Server Error" });
    }


});
// --------------------------------------------------------------------------------------------------

router.post('/login', async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {

        const loginUser = await User.findOne({"email" : req.body.email});
        
        if(!loginUser)
        return res.status(400).json({"error" : "User Not Found"});

        const passwordCheck = bcrypt.compareSync(req.body.password , loginUser.password);
        if(!passwordCheck)
        return res.status(400).json({"error" : "Incorrect credentials"});
        


        const data = await loginUser.id;
        console.log(data);

        const JWT_token = JWT.sign(data, JWT_secret);
        return res.status(201).json({
            "Logged in": "true",
            "authToken" : JWT_token 
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "Error": "Internal Server Error" });
    }


});

module.exports = router;
