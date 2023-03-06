var express = require('express');
const app=express();
var router = express.Router();




var nodemailer = require('nodemailer');
var randtoken = require('rand-token');

import knex from '../../../../database-config'
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const cors = require('cors');
app.use(cors({origin: true, credentials: true}));

export default async function handler(req, res, next) {
    const slug = req.query.slug
    if (slug == "signup") {
        // Encrypt

        const newPassword = bcrypt.hashSync(req.body.password, saltRounds);
        const { name, email } = req.body
        try {
            let data = await knex("user").insert({ name, email, password: newPassword })
            const user = await knex("user").select("*").where({ id: data[0] });
            var token = jwt.sign({ user: user[0] }, process.env.NEXT_PUBLIC_jwtprivateKey, { expiresIn: "1h" })
            await knex("user").update({token:token}).where({id:data[0]})
            user[0].token=token
            res.status(200).json({ status: true, message: "add user successfully", data: user[0] })
        } catch (error) {
            console.log(error);
            res.status(200).json({ status: false, message: error.sqlMessage, data: [] })
        }
    }
    if (slug == "login") {
        try {
            const data = await knex("user").select("*").where({ email: req.body.email })
            if (data.length > 0) {
                const decryptedData = bcrypt.compareSync(req.body.password, data[0].password)
                if (decryptedData) {
                    var token = jwt.sign({ user: data[0] }, process.env.NEXT_PUBLIC_jwtprivateKey, { expiresIn: "1h" })
                    await knex("user").update({token:token}).where({id:data[0].id})
                    data[0]["token"] = token
                    console.log( data[0]);
                    res.status(200).json({ status: true, message: "user login successfully", data: data })
                } else {
                    res.status(200).json({ status: false, message: "your password is incorrect", data: [] })
                }
            } else {
                res.status(200).json({ status: false, message: "Email id does not exist", data: [] })
            }
        } catch (error) {
            res.status(200).json({ status: false, message: error.sqlMessage, data: [] })
        }
    }
    if (slug == "forgot-password") {
        /* reset page */
        const email = req.body.email
        const data = await knex("user").select("*").where({ email: email })
        if (data.length > 0) {

            res.status(200).json({ status: true, message: "Link has been sent to you email address", data: data })
        } else {

            res.status(200).json({ status: false, message: "Email id does not exist", data: data })
        }
        // router.get('/reset-password', function (req, res, next) {
        //     res.render('reset-password', {
        //         title: 'Reset Password Page',
        //         token: req.query.token
        //     });
        // });

    }
    if (slug == "reset-password") {
        //send email
        async function sendEmail(email, token) {
            var email = email;
            var token = token;
            var mail = nodemailer.createTransport({
                service: "gmail",
                host: 'smtp.gmail.com',
                port: 587,
                // auth: {
                //     user: 'katlyn25@ethereal.email',
                //     pass: '2VK9UzC2z31HWD1qUJ'
                // }
                auth: {
                    user: 'chhaya@ditinteractive.com',
                    pass: 'BhagavanChhaya123'
                }
            });
            var mailOptions = {
                from: 'chhaya@ditinteractive.com',
                to: email,
                subject: 'Reset Password Link - codeswear.com',
                html: '<p>You requested for reset password, kindly use this <a href="http://localhost:3000/reset-password?token=' + token + '">link</a> to reset your password</p>'
            };
            // api/authentication/reset-password?token=' + token + '
            const info = await mail.sendMail(mailOptions);
            // console.log(info);
        }
        /* send reset password link in email */
        var email = req.body.email;
        // var email = "parmarprem673@gmail.com";
        // console.log(email);
        try {
            const result = await knex("user").select("*").where({ email: email })
            // console.log(result);
            if (result[0].email.length > 0) {
                var token = result[0].token
                var sent = sendEmail(email, token);
                if (sent != '0') {
                    res.status(200).json({ status: false, message: "The reset password link has been sent to your email address", data: result[0] })
                } else {
                    res.status(200).json({ status: error, message: 'Something goes to wrong. Please try again', data: [] })
                }
            } else {
                res.status(200).json({ status: error, message: 'The Email is not registered with us', data: [] })
            }
        } catch (error) {
            res.status(200).json({ status: error, message: error.sqlMessage, data: [] })
        }
    }
    if (slug == "update-password") {
        try {
            const { password, confirmpassword } = req.body
            const token = req.query.token
            // console.log(token);
            const newPassword = bcrypt.hashSync(password, saltRounds);
            const result = await knex("user").update({ password: newPassword }).where({ token: token })
            // console.log(result);
            if (result > 0) {
                // console.log(result);
                const user = await knex("user").select("*").where({ token: token })
                var accesstoken = jwt.sign({ user: user[0] }, process.env.NEXT_PUBLIC_jwtprivateKey, { expiresIn: "1h" })
                await knex("user").update({ token: accesstoken }).where({ token: token })
                // console.log(accesstoken);
            
                res.status(200).json({ status: true, message: 'Your password has been updated successfully', data: user })
            } else {
                res.status(200).json({ status: false, message: 'Invalid link; please try again', data: [] })
            }

        } catch (error) {
            console.log(error);
            res.status(200).json({ status: error, message: error.sqlMessage, data: [] })
        }
        /* update password to database */
        // try {
        //     const result = await knex("user").select("*").where({ token: token })
        //     if (result.length > 0) {
        //         var saltRounds = 10;
        //         const newPassword = bcrypt.hashSync(req.body.password, saltRounds);
        //         // bcrypt.genSalt(saltRounds, function (err, salt) {
        //         //     bcrypt.hash(password, salt, function (err, hash) {
        //         //         var data = {
        //         //             password: hash
        //         //         }
        //         //         knex("user").update(data).where({ email: result[0].email }).then((data) => {
        //         //             res.status(200).json({ status: true, message: 'Your password has been updated successfully', data: data })
        //         //         }).catch((error) => {
        //         //             res.status(200).json({ status: true, message: error, data: [] })
        //         //         })
        //         //     });
        //         // });

        //         res.status(200).json({ status: true, message: 'Your password has been updated successfully', data: [] })
        //     } else {
        //         res.status(200).json({ status: error, message: 'Invalid link; please try again', data: [] })
        //     }
        // } catch (error) {
        //     res.status(200).json({ status: error, message: error.sqlMessage, data: [] })
        // }
    }
}