const serverless = require('serverless-http');
const express = require('express');
const app = express();
const fs = require("fs");
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;

const relyingPartyConfig = {
    entryPoint : 'https://login.soedev.net/adfs/ls',
    callbackUrl : 'https://k67qtaq4l5.execute-api.ap-southeast-1.amazonaws.com/dev/auth/login/callback',
    issuer : 'https://k67qtaq4l5.execute-api.ap-southeast-1.amazonaws.com/dev/adfs/services/trust',
    logoutUrl: 'https://k67qtaq4l5.execute-api.ap-southeast-1.amazonaws.com/dev/auth/logout',
    awsCert: fs.readFileSync("./publiccert.pem", "utf-8")
}

// function findByEmail(email, fn) {
//     for (var i = 0, len = users.length; i < len; i++) {
//         var user = users[i];
//         if (user.email === email) {
//             return fn(null, user);
//         }
//     }
//     return fn(null, null);
// }

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function (user, done) {
    console.log('serializing');
    done(null, user.email);
});

passport.deserializeUser(function (id, done) {
    console.log('de-serializing');
    findByEmail(id, function (err, user) {
        done(err, user);
    });
});

passport.protected = function protected(req, res, next) {
    console.log('is isAuthenticated =' + req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/invalid');
};

passport.use(new SamlStrategy(
    {
        entryPoint: relyingPartyConfig.entryPoint,
        callbackUrl: relyingPartyConfig.callbackUrl,
        issuer: relyingPartyConfig.issuer,
        logoutUrl: relyingPartyConfig.logoutUrl,
        cert: relyingPartyConfig.awsCert
    },
    function (profile, done) {
        console.log('got profile');
        console.log(profile);

        // user.saml = {};
        // user.saml.nameID = profile.nameID;
        // user.saml.nameIDFormat = profile.nameIDFormat;
        
        done(null,user);

        // findByEmail(profile.email, function (err, user) {
        //     if (err) {
        //         return done(err);
        //     }
        //     return done(null, user);
        // });
    }
));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());


app.get('/auth/login', passport.authenticate('saml', {
    failureRedirect: '/auth/response/',
    failureFlash: true
}), function (req, res) {
    res.redirect('/auth/login/callback');
});

// app.post('/auth/login/callback', (req, res) => {
//     res.redirect("https://google.com.sg")
// });


app.get('/auth/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.post('/auth/logout/callback', (req, res) => {
    res.redirect("https://google.com.sg")
});

app.post("/auth/login/callback",
    (req, res, next) => {
        passport.authenticate("saml", { session: false }, (err, user) => {
            req.user = user;
            next();
        })(req, res, next);
    }
);


module.exports.handler = serverless(app);