var path = require('path');
var passport = require('passport');
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const fs = require("fs");

const relyingPartyConfig = {
    entryPoint: 'https://login.soedev.net/adfs/ls',
    callbackUrl: 'https://k67qtaq4l5.execute-api.ap-southeast-1.amazonaws.com/dev/auth/login/callback',
    issuer: 'https://k67qtaq4l5.execute-api.ap-southeast-1.amazonaws.com/dev/adfs/services/trust',
    logoutUrl: 'https://k67qtaq4l5.execute-api.ap-southeast-1.amazonaws.com/dev/auth/logout',
    awsCert: fs.readFileSync("./publiccert.pem", "utf-8")
}

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

        done(null, user);

        // findByEmail(profile.email, function (err, user) {
        //     if (err) {
        //         return done(err);
        //     }
        //     return done(null, user);
        // });
    }
));


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

        if (!profile.email) {
            return done(new Error("No email found"), null);
        }

        process.nextTick(function () {
            console.log('Finding by email');

            findByEmail(profile.email, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    console.log('new user');
                    users.push(profile);
                    return done(null, profile);
                }
                console.log('existing user');
                return done(null, user);
            })
        });
}));



exports = module.exports = passport;