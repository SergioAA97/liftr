 const passport = require("passport");
 const LocalStrategy = require("passport-local").Strategy;
 const JwtStrategy = require("passport-jwt").Strategy;
 const User = require("../models/User");

passport.use(new JwtStrategy({
   jwtFromRequest:  
}))


 //Define local strategy to use
 passport.use(new LocalStrategy((usr,pwd,done)=>{
    User.findOne({usr},(err,user) =>{
        if(err) //Error in connection
            return done(err);
        if(!usr) //No user found
            return done(null,false);

        //User found
        user.comparePassword(pwd,done);
    })
 }));