const router = require('express').Router();

router.get('/signup', async (req, res) => {
  if (req.session.loggedIn === true) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports= router;
