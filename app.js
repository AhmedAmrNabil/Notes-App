require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const cookieParser = require("cookie-parser");
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("Keeper/build",{index: false}));
app.use(cookieParser());
app.use(
  session({
    secret: `${process.env.SECRET}`,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(`${process.env.DATABASE_URL}`);

const content = {
  id: String,
  username: String,
  title: String,
  content: String,
};
const user = new mongoose.Schema({
  googleId: { type: String, unique: true, required: true },
  notes: content,
});
user.plugin(findOrCreate);
user.plugin(passportLocalMongoose);

const User = mongoose.model("user", user);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.CLIENT_ID}`,
      clientSecret: `${process.env.CLIENT_SECRET}`,
      callbackURL:
        `${process.env.REDIRECT_URL}`,
      // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        { username: profile.emails[0].value, googleId: profile.id },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

app.get("/", function (req, res) {
  if (req.isAuthenticated()) {
    res.sendFile(`${__dirname}/Keeper/build/index.html`);
  } else {
    res.redirect("/auth/google");
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/keeper",
  passport.authenticate("google"),
  function (req, res) {
    res.redirect("/");
  }
);

app.get("/logout",cors({ origin: true }), function (req, res, next) {
  console.log("logging out")
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/notes", function (req, res) {
  User.findOne({ googleId: req.user.googleId }, function (err, results) {
    if (!err) {
      res.send(results);
    } else {
      res.send(err);
    }
  });
});

app.post("/note", function (req, res) {
  User.updateOne(
    { googleId: req.user.googleId },
    { $push: { notes: req.body } },
    function (err, result) {
      if (!err) {
        res.send(`Sucessfully added note number ${req.body.id}`);
      } else {
        res.send(err);
      }
    }
  );
});

app.delete("/note/:index", function (req, res) {
  User.updateOne(
    { googleId: req.user.googleId },
    { $pull: { notes: { id: req.params.index } } },
    function (err, result) {
      if (!err) {
        res.send(`Sucessfully removed note number ${req.params.index}`);
      } else {
        res.send(err);
      }
    }
  );
});

app.listen(port, function () {
  console.log("Started listening on port " + port);
});
