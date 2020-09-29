var express = require("express");
var router = express.Router();
var unirest = require("unirest");


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Karaoke",
    logged: true
  });
});

// router.get("/top100", function (req, res, next) {

//   var req = unirest("GET", "https://billboard-api2.p.rapidapi.com/hot-100");

//   req.query({
//     "date": "2019-05-11",
//     "range": "1-10"
//   });
  
//   req.headers({
//     "x-rapidapi-host": "billboard-api2.p.rapidapi.com",
//     "x-rapidapi-key": "439b9ea5cbmsh933d9fb85629c59p1e0abdjsn9cdc5ee86515",
//     "useQueryString": true
//   });
  
  
//   req.end(function (res) {
//     if (res.error) throw new Error(res.error);
  
//     console.log(res.body);
//   });
// });

router.get('/profile', function(req, res, next){
  res.render('profile')
})   


module.exports = router;

