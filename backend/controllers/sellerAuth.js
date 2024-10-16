const passport = require("passport");
const validator = require("validator");
const Seller = require("../models/Seller");

exports.getLogin = async (req, res) => {
  if (req.user) {
    let seller = await Seller.findOne({ _id: req.user.id });
    if (seller) {
      return res.redirect("/store");
    }
  }
  res.render("sellerLogin");
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) {
    validationErrors.push({ msg: "Please enter a valid email address." });
  }
  if (validator.isEmpty(req.body.password)) {
    validationErrors.push({ msg: "Password cannot be blank." });
  }
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/sellerLogin");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/sellerLogin");
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("info", [{ msg: "Success! You are logged in" }]);
      return res.redirect("/store");
    });
  })(req, res, next);
};

exports.getSignup = (req, res) => {
  if (req.seller) {
    return res.redirect("/store");
  }
  res.render("sellerSignup");
};

exports.postSignup = async (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) {
    validationErrors.push({ msg: "Please enter a valid email address" });
  }
  if (!validator.isLength(req.body.password, { min: 8 })) {
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  }
  if (req.body.password !== req.body.confirmPassword) {
    validationErrors.push({ msg: "Passwords do not match" });
  }
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    console.log(validationErrors);
    return res.redirect("../sellerSignup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const seller = new Seller({
    shopName: req.body.shopName,
    sellerName: req.body.sellerName,
    email: req.body.email,
    password: req.body.password,
  });

  Seller.findOne(
    { $or: [{ email: req.body.email }, { shopName: req.body.shopName }] },
    (err, existingSeller) => {
      if (err) {
        return next(err);
      }
      if (existingSeller) {
        req.flash("errors", {
          msg: "Account with that email address or shop-name already exists.",
        });
        return res.redirect("../sellerSignup");
      }
      seller.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(seller, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/store");
        });
      });
    }
  );
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log("User has logged out.");
  });
  req.session.destroy((err) => {
    if (err) {
      console.log("Error : Failed to destroy the session during logout.", err);
    }
    req.user = null;
    res.redirect("/");
  });
};
