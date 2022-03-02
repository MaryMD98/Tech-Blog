const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// ~~~~~Done~~~~~~~~~Done
// Display the posts created by a user
router.get('/', withAuth, async (req, res) => {
    try{
        const UserData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [ {model: Post, attributes:['id', 'title','date'],} ]
        });
        if(!UserData){ res.status(400).json({message: 'No user found with that ID!'}); return; }
        const userPosts = UserData.get({ plain: true });
        // res.status(200).json(userPosts);
        res.render("dashboard", { style:"style.css" , userPosts , dash_board:true , logged_in: req.session.logged_in });
    }
    catch(err){ res.status(500).json(err);}
});

// ~~~~~Done~~~~~~~~~Done
// create a user
router.post('/', async (req, res) => {
    try{
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    }
    catch(err){ res.status(500).json(err); }
});

// ~~~~~Done~~~~~~~~~Done
// login
router.post('/login', async (req,res) => {
    try{
        const userData = await User.findOne({where: { username: req.body.username }});
        if(!userData){res.status(400).json({message: 'Incorrect username or password, please try again'}); return;}

        const ValidPassword = await userData.checkPassword(req.body.password);
        if(!ValidPassword){res.status(400).json({message: 'Incorrect username or password, please try again'}); return;}

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({user: userData, message: 'You are now Logged in!'});
        });
    }
    catch(err){ res.status(500).json(err);}
});

// ~~~~~Done~~~~~~~~~Done
//logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in){ req.session.destroy(() => {
        res.status(204).end(); });}
    else{ res.status(404).end(); }
});

module.exports = router;
