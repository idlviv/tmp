const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const UserModel = require('../models/userModel');
const config = require('./');

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.get('mongoose:secret');
  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    UserModel.getUserById(jwtPayload._doc._id)
      .then((user) => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch((error) => {
        done(error, false);
      });
  }));
};
