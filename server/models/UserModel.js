const {Model, DataTypes} = require('sequelize');
const {db} = require('../services/db_init.js');
const MessageModel = require('./MessageModel');

class UserModel extends Model {}

UserModel.init({
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : false
    },
    username : {
        type : DataTypes.STRING,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    }
}, {sequelize : db, modelName : 'user'});

UserModel.hasMany(MessageModel);
MessageModel.belongsTo(UserModel);

module.exports = UserModel;

