const { User, Posts, Comment } = require('../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const allPostsData = await Posts.findAll({ include: [{ model: User }, {model: Comment}]});
  const allPosts = allPostsData.map(post => { return post.get({plain: true}) });
  
    res.render('homepage', {
    loggedIn: req.session.loggedIn,
    user: req.session.user,
    allPosts,
});
});

module.exports = router;