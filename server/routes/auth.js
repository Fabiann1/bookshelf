const { Router } = require('express')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel');
require('dotenv').config();

const auth = Router('/api');

auth.get('/', (req, res) => {
    return res.send('Connected!')
})

auth.post('/register', async (req, res, next) => {
    try {
        const {password, name, username} = req.body;
        if (!username || !name || !password) {return res.status(401).json({message : 'Неправильный ввод!'})}
        const userExist = await UserModel.findOne({where : {username : username}});
        if (userExist) {return res.status(401).json({message : 'Пользователь существует!'})}
        const user = await UserModel.create({name, username, password});
        return res.status(201).json({message : 'Пользователь создан!', user})
    } catch (e){
        return next();
    }
});

auth.post('/login', async(req, res, next) => {
    try {
        const { password, username } = req.body;
        console.log(password, username);
        if (!username || !password) {return res.status(401).json({message : 'Неправильный ввод!'})}
        const user = await UserModel.findOne({where : {username : username}});
        if (!user){
            return res.status(401).json({message : 'Пользователь не найден!'})
        }
        if (password !== user.password) {
            return res.status(401).json({message : 'Пароль не совпадает!'})
        }
        const token = jwt.sign({id : user.id}, process.env.JWT_TOKEN || 'secret', {expiresIn : '15m'});
        res.cookie('token', token, {maxAge : 1000 * 60 * 15});
        return res.status(201).json({message : 'Успешно зашёл!',
            user : {id : user.id, name : user.name, username : user.username},
             token : token})
    } catch (e) {
        console.log(e);
        return next();
    }
});

auth.get('/authenticate', async(req, res, next)=>{
    try {
        const token = req.cookies?.token;
        if (!token) {return res.status(401).json({message : 'Пользователь не авторизован!'})}
        const token_decode = jwt.verify(token, process.env.JWT_TOKEN || 'secret');
        const {id} = token_decode;
        const user = UserModel.findByPk(id);
        if (!user) {
            res.clearCookie();
            return res.status(401).json({message : 'Пользователь не найду!'})}
        return res.status(201).json({message : 'Пользователь авторизован!', token : token});
    } catch (e){
        res.json({message : 'Ошибка', error : e});
        return next();
    }
});

module.exports = auth;