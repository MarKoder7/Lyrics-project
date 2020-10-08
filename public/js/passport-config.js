
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');


function initializePassport( Passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        let user = getUserByEmail(email)

        if (user == null) {

            return done(null, false, {message: 'No User with this Email' })
        }        
        try {

            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)

            } else {
                return done(null, {
                    message: 'password incorrect'
                })
            }

        } catch (err) {
            console.log(err.message);
            return done(err)
        }
    }
    passport.use(new localStrategy({
        usernameField: 'email'
    }, authenticateUser))
    passport.serializeUser((user, done) => {
        return done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}


module.exports = initializePassport;