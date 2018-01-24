var express = require('express');
var router = express.Router();
var db = require('../models');
var nodemailer = require('nodemailer');
var emailAddress;

router.route('/')
    .get(function(req, res) {
        res.render('./login/forgot-password');
    })

    .post(function(req, res) {
        emailAddress = req.body.email;
        db.user_table.findOne({
            where: {
                email: emailAddress
            }
        }).then(function(data) {
            if(!data) {
                res.send("Sorry... Email you entered does not exist" + 
                '<br>' + 
                '<a href="/forgot">Return to forgot password page</a>');
            } else {
                var transporter = nodemailer.createTransport({
                    service: 'yahoo',
                    auth: {
                        user: 'EXAMPLE@EXAMPLE.COM',
                        pass: 'EMAIL PASSWORD HERE',
                    }
                });
                var mailOptions = {
                    from: 'EXAMPLE@EXAMPLE.COM',
                    to: data.email,
                    subject: 'forgot password',
                    html: '<p>Go here to reset password<p>' +
                    '<br>' + '<a href="http://localhost:3000/forgot/new"><p>Rotten potatoes</p></a>'
                };
                transporter.sendMail(mailOptions, function(error, info) {
                    if(error) {
                        console.log(error);
                        res.json(error);
                    } else {
                        console.log('Message sent: ' + info.response);
                        res.render('./login/check-email');
                    }
                })
            } // end of mail
        });
    });

router.route('/new')
    .get(function(req, res) {
        res.render('./login/new-password');
    })

    .post(function(req, res) {
        if(req.body.newPass === req.body.confirmPass) {
            db.user_table.update({
                password: req.body.newPass
            }, {
                where: {
                    email: emailAddress
                }
            }).then(function(error, info) {
                if(error) {
                    console.log(error);
                    res.json(error);
                } else {
                    console.log("Password Updated:" + info.response);
                    res.render('./login/login');
                }
            });
        } else {
            return "Your passwords don't match";
        }
    })
module.exports = router;