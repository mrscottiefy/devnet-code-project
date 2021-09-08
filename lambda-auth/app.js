const serverless = require('serverless-http');
const express = require('express');
const app = express();
// const xml = require('xml');
const samlUtil = require('./saml-util.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(samlUtil.initialize());
app.use(samlUtil.session());

app.get('/test', function (req, res) {
    res.json({
        "Message" : "Hello World"
    });
});

app.post('/auth/login/callback', samlUtil.authenticate('saml', {
    failureRedirect: '/auth/response/',
    failureFlash: true
}), function (req, res) {
    // req.session.save(function () {
        res.redirect('/auth/response/');
    // })
});

app.get('/auth/login', samlUtil.authenticate('saml', {
    failureRedirect: '/auth/response/',
    failureFlash: true
}), function (req, res) {
    res.redirect('/auth/response/');
});

app.get('/auth/response', function (req, res) {
    res.end("Hello " + req.session.passport.user);
});

// app.get('/auth/response', samlUtil.protected, function (req, res) {
//     res.end("Hello " + req.session.passport.user);
// });

app.get('/auth/invalid', function (req, res) {
    res.end("Authentication failed");
});

app.get('/auth/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.post('/auth/logout/callback', (req, res) => {
    res.redirect("https://google.com.sg")
});

module.exports.handler = serverless(app);