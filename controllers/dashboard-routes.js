const router = require('express').Router();
const withAuth = require('../utils/auth');
const {Post, User, Comment} = require('../models');

router.get('/', withAuth, (req, res) =>
{
    Post.findAll
    ({
        where: {user_id: req.session.user_id},
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
        res.render('dashboard', {posts, loggedIN: true});
    })
    .catch(err => res.status(500).json(err));
});

router.get('/create', withAuth, (req, res) =>
{
    res.render('create-post', {loggedIN: true});
});

module.exports = router;