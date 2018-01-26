var express = require('express');
var router = express.Router();
var db = require('../models');
var nodemailer = require('nodemailer');
var bCrypt = require('bcrypt-nodejs');
var emailAddress;

router.route('/')
    .get(function(req, res) {
        res.render('./login/forgot-password', {notify: req.flash('notify')});
    })

    .post(function(req, res) {
        emailAddress = req.body.email;
        db.user.findOne({
            where: {
                email: emailAddress
            }
        }).then(function(data) {
            if(!data) {
                req.flash('notify','This email does not exist. Please register an account');
                res.redirect('/forgot');
            } else {
                var transporter = nodemailer.createTransport({
                    service: 'yahoo',
                    auth: {
                        user: 'rottenpotatoes@yahoo.com',
                        pass: 'blahblah@123',
                    }
                });
                var mailOptions = {
                    from: 'rottenpotatoes@yahoo.com',
                    to: data.email,
                    subject: 'Forgot Password',
                    html: '<p>Go here to reset password<p>' +
                    '<br>' + '<a href="https://rotten-potatoes-90454.herokuapp.com/forgot/new"><p>Rotten Potatoes reset password</p></a>'
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
            var generateHash = function(password) {
				return bCrypt.hashSync(password, bCrypt.genSaltSync(8),null)
            }
            db.user.update({
                password: generateHash(req.body.newPass)
            }, {
                where: {
                    email: emailAddress
                }
            }).then(function() {
                res.redirect('/login');
            });
        } else {
            // flash message? passwords don't match
        }
    })
module.exports = router;