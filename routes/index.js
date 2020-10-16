var express = require("express");
var router = express.Router();

//User Model
const User = require('../models/User')
const bcrypt = require('bcrypt');
const passport = require("passport");
const {
  ensureAuthenticated
} = require('../config/auth');






/* GET home page. */
router.get("/", function (req, res) {

  res.render("index", {
    title: "Lyrics Home",
    logged: true,
    success_msg: req.flash('success_msg'), // To Display errors Using FLASH, method app.js line (58)
   

  });
});

/* GET users listing. */
router.get("/login", (req, res) => {

  res.render("login", {
    title: "login",
    logged: true,
    success_msg: req.flash('success_msg') // To Display errors Using FLASH, method app.js line (58)

  })
});

//POST Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
    logged: true

  })(req, res, next);

});

// GET Register
router.get("/register", (req, res) => {

  res.render("register", {
    title: "register",
    logged: true
  })
});

// POST Register
router.post('/register', (req, res) => {
  const {
    name,
    email,
    password,
    password2
  } = req.body;
  let errors = [];

  // Check Required fields 
  if (!name || !email || !password || !password2) {
    errors.push({
      msg: 'Please fill in all fields'
    });
  }
  // Check Password match 
  if (password !== password2) {
    errors.push({
      msg: 'Passwords Do Not match'
    });
  }
  // Check password length
  if (password.length < 6) {
    errors.push({
      msg: 'Password should be at least 6 characters'
    })
  }
  if (errors.length > 0) {
    res.render('register', {
      logged: true,
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({
        email: email
      })
      .then(user => {
        if (user) {
          // User exists
          errors.push({
            msg: "Email already Registerd"
          })

          res.render('register', {
            logged: true,
            errors,
            name,
            email,
            password,
            password2
          })

        } else {
          const newUser = new User({
            name,
            email,
            password
          })


          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {

              if (err) throw err;
              newUser.password = hash;
              console.log(newUser);

              // Save new User
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'Yor are now Registered and can login')
                  res.redirect('/login')
                  console.log(newUser);
                  console.log(req.flash('success_msg'));
                })
                .catch(err => console.log(err))
            })
          });

        }
      })
  }
});

// Dashboard Route 
router.get('/dashboard', ensureAuthenticated, function (req, res, next) {
  res.render('dashboard', {
    title: "Dashboard",
    logged: true,
    name: req.user.name

  });
});


//Profile route
router.get('/about', function (req, res, next) {
  res.render('about', {
    title: "Profile",
    logged: true
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', ' You are logged out');
  res.redirect('/login')
})

module.exports = router;