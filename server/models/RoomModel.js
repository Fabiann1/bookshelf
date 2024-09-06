const {db} = require('../services/db_init');
const {Model, DataTypes} = require('sequelize');
const MessageModel = require('./MessageModel');

class RoomModel extends Model {}

RoomModel.init({
    id : {type : DataTypes.INTEGER, autoIncrement : true, primaryKey : true},
    name : {type : DataTypes.STRING}
}, {sequelize : db, modelName : 'room'});

RoomModel.hasMany(MessageModel);
MessageModel.belongsTo(RoomModel);

module.exports = RoomModel;