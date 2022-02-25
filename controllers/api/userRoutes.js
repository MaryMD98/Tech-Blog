const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// create a user
router.post();

// login
router.post();

//logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in){ req.session.destroy(() => {
        res.status(204).end(); });}
    else{ res.status(404).end(); }
});

module.exports = router;
