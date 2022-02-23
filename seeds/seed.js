const sequelize = require('../config/connection');
const { Comment, Post, User } = require('../models');

const user_data = require('./userData.json');
const post_data = require('./postData.json');
const comment_data = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ fore: true });

    const users = await User.bulkCreate(user_data, {
        individualHooks: true,
        returning: true,
    });
    console.log('\n----- USERS SEEDED -----\n');

    const posts = await Post.bulkCreate(post_data);
    console.log('\n----- POSTS SEEDED -----\n');

    const comments = await Comment.bulkCreate(comment_data);
    console.log('\n----- COMMENTS SEEDED -----\n');

    process.exit(0);
};

seedDatabase();
