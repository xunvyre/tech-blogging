const router = require('express').Router();
const {User, Post, Comment} = require('../../models');

router.get('/', (req, res) =>
{
    User.findAll(
    {
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err =>
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) =>
{
    User.findOne
    ({   
        attributes: {exclude: ['password']}, 
        where: {id: req.params.id},
        include:
        [
            {
                model: Post,
                attributes: ['id', 'title', 'post_text', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include:
                {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
    .then (dbUserData =>
    {
        if(!dbUserData)
        {
            res.status(404).json({ message: 'No user found under this id.' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err =>
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) =>
{
    User.create
    ({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err =>
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) =>
{
    User.findOne
    ({
        where: {email: req.body.email}
    })
    .then(dbUserData =>
    {
        if (!dbUserData)
        {
            res.status(400).json({message: `No user found with that email.`});
            return;
        }

        const validPW = dbUserData.checkPassword(req.body.password);
        if (!validPW)
        {
            res.status(400).json({message: `Incorrect password.`});
            return;
        }
        res.json({user: dbUserData, message: `Welcome to Well, Actually!`});
    });
});

router.put('/:id', (req, res) =>
{
    //if req.body had exact key/value pairs, use req.body instead
    User.update(req.body,
    {
        individualHooks: true,
        where: {id: req.params.id}
    })
    .then(dbUserData =>
    {
        if (!dbUserData[0])
        {
            res.status(404).json({ message: 'No user found with this id.' });
            return;
        }
        res.json(dbUserData);
    })
    .catch (err =>
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) =>
{
    User.destroy({ where: {id: req.params.id}})
    .then(dbUserData =>
    {
        if (!dbUserData[0])
        {
            res.status(404).json({ message: 'No user found with this id.' });
            return;
        }
        res.json(dbUserData);
    })
    .catch (err =>
    {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;