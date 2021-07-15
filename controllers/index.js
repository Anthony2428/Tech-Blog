const router = require('express').Router();
const home = require("./homeRoute");
const login = require('./login');
const signup = require('./signup');
const apiRoute = require('./api')
const dashboard = require('./dashRoute');

router.use('/api', apiRoute);
router.use('/', home);
router.use('/', login);
router.use('/', signup);
router.use('/dashboard', dashboard);

module.exports = router;