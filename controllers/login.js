const router = require('express').Router();

router.get('/login', (req, res) => {
    if (req.session.loggedIn === true) {
      res.redirect('/');
      return;
    }
    res.render('login');
});

module.exports = router;
