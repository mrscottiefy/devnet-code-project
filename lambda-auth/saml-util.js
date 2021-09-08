const path = require('path');
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
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

// passport.protected = function protected(req, res, next) {
//     console.log('is isAuthenticated =' + req.isAuthenticated());
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/auth/invalid');
// };

passport.use(new SamlStrategy(
    {
        entryPoint: relyingPartyConfig.entryPoint,
        callbackUrl: relyingPartyConfig.callbackUrl,
        issuer: relyingPartyConfig.issuer,
        logoutUrl: relyingPartyConfig.logoutUrl,
        cert: relyingPartyConfig.awsCert,
        authnContext: ['urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport'],
        identifierFormat: null
    }, 
    function (profile, done) {
        return done(null, 
            {
                id: profile.uid,
                email: profile.email,
                displayName: profile.cn,
                firstName: profile.givenName,
                lastName: profile.sn
            }
        );
    }
));

exports = module.exports = passport;