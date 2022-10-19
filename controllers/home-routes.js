const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');

router.get('/', (req, res) =>
{
    console.log(req.session);
    Post.findAll
    ({
        attributes: ['id', 'title', 'summary', 'post_text', 'created_at'],
        include:
        [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include:
                {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData =>
    {
        const posts = dbPostData.map(post => post.get({plain: true}))
        res.render('homepage', {posts, loggedIN: req.session.loggedIN});
    })
    .catch(err => res.status(500).json(err));
});

router.get('/login', (req, res) =>
{
    if (req.session.loggedIN)
    {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/posts/:id', (req, res) =>
{
    Post.findOne
    ({
        where: {id: req.params.id},
        attributes: ['id', 'title', 'summary', 'post_text', 'created_at', 'updated_at'],
        include:
        [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
                include:
                {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData =>
    {
        if(!dbPostData)
        {
            res.status(404).json({message: `No post exists under this ID.`});
            return;
        }

        const post = dbPostData.get({plain: true});
        res.render('single-post', {post, loggedIN: req.session.loggedIN});
    })
    .catch(err =>
    {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;