const User = require('./User');
const Posts = require('./Posts')
const Comment = require('./Comment');

User.hasMany(Posts, {
    foreignKey: 'author_id',
    onDelete: 'CASCADE',
});

User.hasMany(Comment, {
    foreignKey: 'author_id',
    onDelete: 'CASCADE',
});

Posts.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

Posts.belongsTo(User, {
    foreignKey: 'author_id',
  });

Comment.belongsTo(Posts, {
    foreignKey: 'post_id',
  });

module.exports = {User, Posts, Comment};