const router = require('express').Router();
const {User, Post, Comment} = require('../../models');

router.get('/', (req, res) =>
{
    Post.findAll
    ({
        attributes: ['id', 'user_id', 'title', 'entry', 'updated_at'],
        order: [['updated_at', 'DESC']],
        include:
        [
            {
                model: Image,
                attributes: ['id', 'type', 'name', 'data', 'user_id', 'post_id', 'created_at'],
                include:
                {
                    model: User,
                    attributes: ['username']
                }
            },
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
        attributes: ['id', 'title', 'entry', 'created_at'],
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

module.exports = router;