var express = require("express"),
    router  = express.Router();
    
var User = require("../models/user"),
    passport = require("passport");

// Root Route
router.get("/", function(req, res){
    res.render("landing");
});

// Register Form
router.get("/register", function(req, res){
    res.render("register");
});

// Signup Logic
router.post("/register", function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if(err){
           req.flash("error", err.message);
           return res.redirect("/register");
       }
       passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to YelpCamp " + user.username);
           res.redirect("/campgrounds");
       });
   });
});

// Show Login Form
router.get("/login", function(req, res){
   res.render("login");
});

// Login Logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// Logout Route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Succesfully logged out!");
   res.redirect("/campgrounds");
});

module.exports = router;