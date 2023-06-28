const express = require("express");
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtScrete = process.env.SECRET_KEY;


router.post('/createuser',
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
        body('mobile').isLength({ min: 10, max: 10 }).withMessage('mobile must be at least 10 characters'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const existingUserEmail = await User.findOne({ email: req.body.email });
            const existingUserMobile = await User.findOne({ mobile: req.body.mobile });

            if (existingUserEmail) {
                return res.status(400).json({ errors: 'A user is already registered with this email address.' });
            } else if (existingUserMobile) {
                return res.status(400).json({ errors: 'Already registered this mobile number.' });
            } else if (req.body.password !== req.body.cpassword) {
                res.status(400).json({ error: "password do not match !" });

            } else {

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                const hashedCPassword = await bcrypt.hash(req.body.cpassword, salt);

                await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    password: hashedPassword,
                    cpassword: hashedCPassword,
                });
                res.json({ success: true });

            }
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }

    }
);


router.post('/loginuser', async (req, res) => {

    const email = req.body.email
    try {
        const userdata = await User.findOne({ email })
        if (!userdata) {
            return res.status(400).json({ errors: "please try valide email" });
        }
        const pwdCompare = await bcrypt.compare(req.body.password, userdata.password)
        if (!pwdCompare) {
            return res.status(400).json({ errors: "please try valide password" });
        }

        const data = {
            user: {
                id: userdata.id
            }
        }

        const authtoken = jwt.sign(data, jwtScrete)
        return res.json({ success: true, authToken: authtoken });

    } catch (error) {
        console.log(error);
        res.json({ success: false });

    }

})


router.post('/user', async (req, res) => {

    try {
      const email  = req.body.email; // Extracting the email from query parameters
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'email not found' });
      }
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  });





module.exports = router;