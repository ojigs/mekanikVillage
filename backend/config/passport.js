const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Seller = require("../models/Seller");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    'local', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // req.usedStrategy = 'local'
      // console.log(req.usedStrategy)
      Seller.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      });
    })
  );

  //Passport use a different strategy for Users
  passport.use(
    'local-user', new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { msg: `User email ${email} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      });
    })
  );

  class SessionConstructor {
    constructor(userId, userGroup, details) {
      this.userId = userId;
      this.userGroup = userGroup;
      this.details = details;
    }
  }

  // passport.serializeUser((user, done) => {
  //   done(null, user.id);
  // });

  // passport.deserializeUser((id, done) => {
  //   Seller.findById(id, (err, user) => done(err, user));
  // });

  passport.serializeUser(function (userObject, done) {
    // userObject could be a Model1 or a Model2... or Model3, Model4, etc.
    let userGroup = "model1";
    let userPrototype = Object.getPrototypeOf(userObject);

    if (userPrototype === Seller.prototype) {
      userGroup = "model1";
    } else if (userPrototype === User.prototype) {
      userGroup = "model2";
    }

    let sessionConstructor = new SessionConstructor(userObject.id, userGroup, '');
    done(null, sessionConstructor);
  });

  passport.deserializeUser(function (sessionConstructor, done) {

    if (sessionConstructor.userGroup == 'model1') {
      Seller.findOne({
        _id: sessionConstructor.userId
      }, '-localStrategy.password', function (err, user) { 
        // When using string syntax, prefixing a path with - will flag that path as excluded.
        done(err, user);
      });
    } else if (sessionConstructor.userGroup == 'model2') {
      User.findOne({
        _id: sessionConstructor.userId
      }, '-localStrategy.password', function (err, user) { 
        // When using string syntax, prefixing a path with - will flag that path as excluded.
        done(err, user);
      });
    }
  });
};
