const bcrypt = require('bcrypt');
const User = require('../models/User');
// const jwt = require('jsonwebtoken')


const { SendOTPVerificationEmail } = require("./verification.controller")


const SignupController = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        console.log("aa rh h")

        const result = await User.find({ email })

        if (result.length) {
            res.status(401).json({
                status: "BAD",
                message: "User with this email id is already exist"
            })
        }
        else {
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                verified: false
            });

            // console.log(res, "res aa gya")
            await newUser.save();
            SendOTPVerificationEmail(newUser, res);
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({
            status: "crashed",
            message:  "server crashed maybe!"
        })
    }
}


const SigninController = async (req, res) => {
    console.log("before try ")
    try {
        let { email, password } = req.body;
        console.log(req.body,"under try ");
        if (!(email && password)) {
            console.log("under k under");
            res.status(401).json({
                message: "Empty details are not allowed"
            })
        }

        else {
            const data = await User.findOne({ email })
            console.log(data);
            if (data.length == 0) {
                console.log("Email i'd doesn't exist. Please Register first")
                res.status(401).json({
                    message: "Email i'd doesn't exist. Please Register first"
                })
            }
            else if (!data.verified) {
                console.log("not verified")
                res.status(401).json({
                    message: "Email has not been verified yet"
                })
            }
            else {
                console.log("everything is ok");
                const hashedPassword = data.password;
                const result = await bcrypt.compare(password, hashedPassword);
                console.log("after comparing passwords",result)
                res.send({
                    message: "Singin Successful",
                    // authToken: token,
                    email: data.email,
                    userId: data._id
                })

                // if (result) {
                //     const claims = {
                //         email: email
                //     }

                //     const token = await jwt.sign(claims, process.env.JWT_KEY)
                //     console.log(token, "ye token h")

                //     res.send({
                //         message: "Singin Successful",
                //         authToken: token,
                //         email: data.email,
                //         userId: data._id
                //     })
                // }
                // else {
                //     res.status(401).json({
                //         message: "Invalid credentials entered"
                //     })
                // }
            }
        }
    } catch (error) {
        console.log("catching the errror")
        res.status(401).json({
            staus: "FAILED",
            message: error.message
        })
    }
}

module.exports = {
    SigninController,
    SignupController,
}

