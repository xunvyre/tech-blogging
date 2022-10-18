const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

//create post model
class Post extends Model {};

Post.init
(
    {
        id:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title:
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len: [2, 40]}
        },
        summary:
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len: [3, 350]}
        },
        post_text:
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len: [150]}
        },
        user_id:
        {
            type: DataTypes.INTEGER,
            references:
            {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;