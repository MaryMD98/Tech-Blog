const router = require('express').Router();
const { Comment, Post, User } = require('../models/index');
const withAuth = require('../utils/auth');

// ~~~~~Done~~~~~~~~~Done
// Homepage will display all the post on database
router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({
            attributes:['id', 'title', 'info', 'date'],
            include:[{ model: User, attributes:['username']},],
        });
        // Serialize data so the template can read it
        const DataPost = postData.map((post) => post.get({ plain: true }));
        //pass serialized data and session flag into template
        // res.status(200).json(DataPost);
        res.render("homepage", { style:"style.css" , DataPost , dash_board:false , logged_in:req.session.logged_in });
    }
    catch (err){ res.status(500).json(err); }
});

// ~~~~~Done~~~~~~~~~
// create the route for creating a new comment
// id param is the post id
router.post('/:id', withAuth, async (req, res) => {
    try{
        const newComment = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            post_id: req.params.id,
        });
        res.status(200).json(newComment);
    }
    catch(err){ res.status(500).json(err);}
});

// login route, if already logged in send to dashboard, otherwise send to login page
router.get('/login', (req, res) => {
    if(req.session.logged_in){ res.redirect('/api/users/'); }
    else {res.render('login', {style:"style.css" , dash_board:true });}
});

// sign up route, if already logged in send to dashboard, otherwise send to sign up page
router.get('/signup', (req, res) => {
    if(req.session.logged_in){ res.redirect('/api/users/'); }
    else {res.render('signup', {style:"style.css" , dash_board:true });}
});

module.exports = router;