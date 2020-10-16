const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const passport = require('passport');

//Load User Model
const User = require('../models/User')

module.exports = function (passport) {
    passport.use(
        new localStrategy({
            usernameField: 'email'
        }, (email, password, done) => {
            User.findOne({
                    email: email
                })
                .then(user => {
                    if (!user)  {
                        return done(null, false, {
                            message: 'That email is Not Registered !'
                        })
                    }
                    //match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw (err)
                        console.log(err);

                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, {
                                message: 'Password incorrect'
                            })
                        }

                    });

                    passport.serializeUser((user, done) => {
                        return done(null, user.id)
                    })
                    passport.deserializeUser((id, done) => {
                        User.findById(id, (err, user) => {
                            done(err, user)
                        })
                    })
                })
        })
    )
}