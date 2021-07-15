const { Comment, Posts } = require('../../models');
const router = require('express').Router();
const isAuthenticated = require('../../config/middleware/isAuthenticated')
//this creates a new post 

router.post('/', isAuthenticated, async (req,res) => {
    try {
        const dbCommentData = await Comment.create({
            body: req.body.comment,
            author_id: req.session.user.id,
            author_username: req.session.user.username,
            post_id: req.body.commentID,
            timestamp: req.body.date
        });
              
        res.status(200).json(dbCommentData);

    } catch (err) {
        console.log(err)
        const unauthenticatedStatusCode = 401;
        res.status(unauthenticatedStatusCode).json(err);
    }   
});

router.get('/', async (req,res) =>{
    try {
        const commentData = await Comment.findAll({ include: [{ model: Posts }]})
        
        res.status(200).json({commentData});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;