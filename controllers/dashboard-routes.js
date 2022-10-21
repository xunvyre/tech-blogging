const router = require('express').Router();
const withAuth = require('../utils/auth');
const {Post, User, Comment} = require('../models');

router.get('/', withAuth, (req, res) =>
{
    console.log(req.session);
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

router.get('/edit/:id', withAuth, (req, res) =>
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
        res.render('edit-post', {post, loggedIN: true});
    })
    .catch(err =>
    {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;