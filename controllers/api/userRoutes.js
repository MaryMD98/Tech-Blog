const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// create a user
router.post('/', async (req, res) => {
    try{
        const userData = await User.create({
            username: req.body.username,
            password: req.body.passowrd,
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    }
    catch(err){ res.status(500).json(err); }
});

// login
router.post('/login', async (req,res) => {
    try{
        const userData = await User.findOne({where: { email: req.body.email }});
        if(!userData){res.status(400).json({message: 'Incorrect email or password, please try again'}); return;}

        const ValidPassword = await userData.checkPassword(req.body.password);
        if(!ValidPassword){res.status(400).json({message: 'Incorrect email or password, please try again'}); return;}

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({user: userData, message: 'You are now Logged in!'});
        });
    }
    catch(err){ res.status.json(err);}
});

//logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in){ req.session.destroy(() => {
        res.status(204).end(); });}
    else{ res.status(404).end(); }
});

module.exports = router;
