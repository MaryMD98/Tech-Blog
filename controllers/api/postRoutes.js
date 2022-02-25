const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// render to page to create new post, only withAuth can create
router.get('/', withAuth, (req, res)=>{ res.render("nameofrender"); });

// read one post by its id
router.get('/:id', async (req, res) => {
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

// create a new post, needs withAuth
router.post('/', withAuth, async (req, res) => {
    try{
        const postData = await Post.create({
            title: req.body.title,
            info: req.body.info,
            user_id: req.session.user_id, 
        });
        res.status(200).json(postData);
    }
    catch (err){ res.status(500).json(err); }
});

// update a one post needs withAuth
router.put('/:id', withAuth, async (req, res) => {
    try{
        const postData = await Post.update(
          {
            title: req.body.title,
            info: req.body.info,
          },
          { where: { id: req.params.id }, } //,user_id: req.session.user_id
        );
        res.status(200).json(postData);
    }
    catch (err){ res.status(500).json(err); }
});

// delete a  post needs withAuth
router.delete('/:id', withAuth, async (req, res) => {
    try{
        const postData = await Post.destroy({
            where: {id: req.params.id, user_id: req.session.user_id},
        });
        // validate if the id exists in the database
        if(!postData){res.status(404).json({message: 'NO post found with that ID'}); return;}
        res.status(200).json(postData);
    }
    catch(err){ res.status(500).json(err); }
});

module.exports = router;