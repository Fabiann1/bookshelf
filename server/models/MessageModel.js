const { db } = require("../services/db_init");
const { Model, DataTypes } = require("sequelize");

class MessageModel extends Model {}

MessageModel.init({
    id : {type : DataTypes.INTEGER, autoIncrement : true, primaryKey : true},
    text : {type : DataTypes.STRING, allowNull : false}
    }, {sequelize : db, modelName : 'message'});

module.exports = MessageModel;