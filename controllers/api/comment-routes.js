const router = require('express').Router();
const withAuth = require('../../utils/auth');
const {Comment} = require('../../models');

router.get('/', (req, res) =>
{
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err =>
    {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) =>
{
    Comment.create
    ({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
    .then (dbCommentData => res.json(dbCommentData))
    .catch(err =>
    {
        console.log(err);
        res.status(400).json(err);
    });
});

router.put('/', withAuth, (req, res) =>
{
    Comment.update
    (
        {comment_text: req.body.comment_text},
        {where: {id: req.params.id}}
    )
    .then (dbCommentData => res.json(dbCommentData))
    .catch(err =>
    {
        console.log(err);
        res.status(400).json(err);
    });
});

router.delete('/', withAuth, (req, res) =>
{
    Comment.destroy
    ({
        where: {id: req.params.id}
    })
    .then (dbCommentData => res.json(dbCommentData))
    .catch(err =>
    {
        console.log(err);
        res.status(400).json(err);
    });
});

module.exports = router;