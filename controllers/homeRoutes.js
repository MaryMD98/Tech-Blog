const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Homepage will display all the post on database
router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({
            attributes:['id', 'title', 'info', 'date'],
            include:[{model: Comment, attributes:['content','date'], 
                            include:[{model: User, attributes:['username']}],},
                    {model: User, attributes:['username']},],
        });
        // Serialize data so the template can read it
        const DataPost = postData.map((post) => post.get({ plain: true }));
        //pass serialized data and session flag into template
        res.status(200).json(DataPost);
        // res.render("homepage", {DataPost, logged_in: req.session.logged_in });
    }
    catch (err){ res.status(500).json(err); }
});

// create the route for creating a new comment


// login route, if already logged in send to dashboard, otherwise send to login page
router.get('/login', (req, res) => {
    if(req.session.logged_in){ res.redirect('/'); return; }
    res.render('login');
});

//add coment

module.exports = router;