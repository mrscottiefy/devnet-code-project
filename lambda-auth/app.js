const serverless = require('serverless-http');
const express = require('express');
const app = express();

const samlUtil = require('./saml-util.js');



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(samlUtil.initialize());
app.use(samlUtil.session());


app.get('/auth/login', passport.authenticate('saml', {
    failureRedirect: '/auth/response/',
    failureFlash: true
}), function (req, res) {
    res.redirect('/auth/login/callback');
});

app.post("/auth/login/callback",
    (req, res, next) => {
        passport.authenticate("saml", { session: false }, (err, user) => {
            req.user = user;
            next();
        })(req, res, next);
    }
);

app.get('/auth/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.post('/auth/logout/callback', (req, res) => {
    res.redirect("https://google.com.sg")
});



module.exports.handler = serverless(app);