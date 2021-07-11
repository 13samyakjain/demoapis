const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/user')
const keys = require('./keys');
const passport = require('passport')

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrkey = keys.Secret_key;

module.exports = passport =>{
    passport.use(new JWTStrategy(opts,(payload,done)=>{
        UserModel.findById(payload.id)
            .then(user=>{
                if(user){
                    return done(null,user)
                }
                return done(null,false)
            })
            .catch(error=>{
                console.log(error)
            })
    }))
    passport.serializeUser((user,cb)=>{
        cb(null,user.id);
    })
    passport.deserializeUser((id,cb)=>{
        UserModel.find({_id:id},(err,user)=>{
            cb(err,user)
        })
    })
}