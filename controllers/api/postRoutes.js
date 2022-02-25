const router = require('express').Router();
const { render } = require('express/lib/response');
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// render to page to create new post, only withAuth can create
router.get('/', withAuth, (req, res)=>{ res.render("nameofrender"); });

// read one post by its id
render.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk( req.params.id, {
            attributes:['id', 'title', 'info', 'date'],
            include:[{model: Comment, attributes:['content','date'], 
                            include:[{model: User, attributes:['username']}],},
                    {model: User, attributes:['username']},],
        });
        //validate if the id exists on database
        if(!postData){ res.status(404).json({ message: 'No Post found with that ID'}); return; }
        // Serialize data so the template can read it
        const DataPost = postData.get({ plain: true });
        //pass serialized data and session flag into template
        res.status(200).json(DataPost);
        // res.render("homepage", {DataPost, logged_in: req.session.logged_in });
    }
    catch (err){ res.status(500).json(err); }
});

// create a new post needs withAuth

// update a one post needs withAuth

// delete a  post needs withAuth

module.exports = router;