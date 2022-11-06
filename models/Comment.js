const { Model, DataTypes } = require('sequelize');
const sequelize = require('sequelize');

class Comment extends Model {}

// define comment models
Comment.init(
    {
        id: {
            tyep: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment_txt: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'cascasde',
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    // connect to sequelize
    {
        sequelize,
        freezeTableName: true,
        modelName: 'comment'
    }
);

module.exports = Comment;