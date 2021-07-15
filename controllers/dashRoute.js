const { Posts } = require('../models');
const router = require('express').Router();
const isAuthenticated = require('../config/middleware/isAuthenticated');

router.get('/', isAuthenticated, async (req, res) => {
  try {
      const postData = await Posts.findAll({ where: { author_id: req.session.user.id } })
      const myPosts = postData.map(post => { return post.get({ plain: true }) });
      res.render('myDashboard', { myPosts, loggedIn: req.session.loggedIn, helpers: { json: function (context) { return JSON.stringify(context);}} });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

module.exports = router;