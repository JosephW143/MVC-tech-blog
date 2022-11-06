const { Model, DataTypes } = require('sequelize');
const sequelize = require('sequelize');
const bcrypt = require('bcrypt');

// creates the User model
class User extends Model {
    checkPassword(LoginPw) {
        return bcrypt.compareSync(LoginPw, this.password);
    }
};

// define User columns

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        // connection to sequelize
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'user'

    }
);

module.exports = User