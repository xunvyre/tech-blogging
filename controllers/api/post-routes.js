const router = require('express').Router();
const {User, Post, Comment} = require('../../models');

router.get('/', (req, res) =>
{
    Post.findAll
    ({
        attributes: ['id', 'user_id', 'title', 'summary', 'post_text', 'updated_at'],
        order: [['created_at', 'DESC']],
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err =>
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) =>
{
    Post.findOne
    ({
        where: {id: req.params.id},
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
        if (!dbPostData)
        {
            res.status(404).json({message: `No posts under this ID.`});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err =>
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) =>
{
    Post.create
    ({
        title: req.body.title,
        summary: req.body.summary,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err =>
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) =>
{
    Post.update
    (
        { title: req.body.title, summary: req.body.summary, post_text: req.body.post_text },
        { where: {id: req.params.id} }
    )
    .then(dbPostData =>
        {
            if (!dbPostData)
            {
                res.status(404).json({message: 'No post under this ID.'});
                return;
            }
            res.json(dbPostData);
        })
    .catch(err =>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) =>
{
    Post.destroy({where: {id: req.params.id}})
    .then(dbPostData =>
    {
        if (!dbPostData)
        {
          res.status(404).json({message: 'No post under this ID.'});
          return;
        }
        res.json(dbPostData);
    })
    .catch(err =>
    {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;