const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

/** Model Relationship
 * user has many post *
 * user can have many coments *
 * coments belong to one post *
 * coments belong to one user *
 * post can have many comments *
 * post belong to one user *
 */

//user has many post
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//user can have many coments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

//coments belong to one post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

//coments belong to one user
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

//post can have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

//post belong to one user 
Post.belongsTo(User, {
    foreignKet: 'user_id'
});


module.exports = { Comment, Post, User };