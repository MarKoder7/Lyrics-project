var express = require("express");
var app = express.Router();

const bcrypt = require('bcrypt');
const passport = require("passport");
let users = [];


/* GET home page. */
app.get("/", function (req, res, next) {
  res.render("index", {
    title: "Karaoke",
    logged: true,
    
  });
});

/* GET users listing. */
app.get("/login", (req, res, next) => {

  res.render("login", {
    title: "login",
    logged: true
  })
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  // name: req.user.name
}))



app.get("/register", (req, res, next) => {

  res.render("register", {
    title: "register",
    logged: true
  })
});

app.post('/register', async (req, res) => {

  try {
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')

  } catch (err) {
    console.log(err.message);
    res.redirect('/register')
  }
  console.log(users);
})


//Profile route
app.get('/profile', function (req, res, next) {
  res.render('profile', {
    title: "Profile",
    logged: true
  });
});


  

module.exports = app;
