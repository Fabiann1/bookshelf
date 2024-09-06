const {Strategy, ExtractJwt} = require('passport-jwt');
const passport = require('passport');
const UserModel = require('../models/UserModel');
require('dotenv').config();

const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_TOKEN || 'secret'
};

const strategy = new Strategy(opts, async (payload, done)=>{
    try {
        const user = UserModel.findByPk(payload.id);
        if (user) {return done(null, user)}
    } catch (e) {
        return done(e)
    }
});

module.exports = strategy;