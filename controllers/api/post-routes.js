const { User, Posts, Comment} = require('../../models');
const router = require('express').Router();
const isAuthenticated = require('../../config/middleware/isAuthenticated')
//this creates a new post 

router.post('/', isAuthenticated, async (req,res) => {
    try {
        const user = await User.findOne({where: {id: req.session.user.id}});
        const dbPostData = await Posts.create({
            subject: req.body.subject,
            body: req.body.body,
            author_id: req.session.user.id,
            timestamp: req.body.date
        });
              
        res.status(200).json(dbPostData);

    } catch (err) {
        console.log(err)
        const unauthenticatedStatusCode = 401;
        res.status(unauthenticatedStatusCode).json(err);
    }   
});

router.get('/:id', async (req,res) =>{
    try {
        const postData = await Posts.findOne({ where: { id: req.params.id } })
        const post = postData.get({plain: true})
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
router.put('/:id', async (req,res) => {
    try {
        const dbPostData = await Posts.update(
            {
                subject: req.body.subject,
                body: req.body.body,
                timestamp: req.body.date
            },
            { 
                where: { id: req.params.id } 
            });
              
        res.status(200).json(dbPostData);

    } catch (err) {
        console.log(err)
        const unauthenticatedStatusCode = 401;
        res.status(unauthenticatedStatusCode).json(err);
    }   
});

router.get('/', async (req,res) =>{
    try {
        const postsData = await Posts.findAll({ include: [{ model: User }, {model: Comment}]})
        const posts = postsData.map(post => post.get({plain: true}))
        res.status(200).json({posts});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
router.delete('/:id', async (req,res) =>{
    try {
        const postsData = await Posts.findOne({ where: {id: req.params.id }})
        if (postsData) {
            Posts.destroy({ where: {id: req.params.id}})
        } else {
            console.log('A post with that id does not exist')
        }
        res.status(200).json({message: 'Post has been deleted!'});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;