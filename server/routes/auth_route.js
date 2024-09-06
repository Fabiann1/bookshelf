const { Router } = require('express')

const auth = require('./auth');

const routes = Router('/api', auth);


routes.get('/', (req, res) => {
    return res.send('Connected!')
});

module.exports = routes 