const express = require('express');
const passport = require('passport');
const strategy = require('./services/passport');
const {db_connect} = require('./services/db_init');
const {defineModels} = require('./models/defineModels');
const cors = require('cors');
const auth = require('./routes/auth');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const app = express();
const server = require('node:http').createServer(app);
const io = require('socket.io')(server, {cors : {origin : '*', methods : ['GET', 'POST']}});

defineModels();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
passport.initialize();
passport.use('jwt', strategy);

// io.on('connection', (socket)=>{
//     console.log('is connected');
//     socket.on('disconnect', ()=>{
//         console.log('user disconnected');
//     });

//     socket.on('groupadd', ({group_id, user_id})=>{

//     })
    
// });

app.get('/', (req,res)=>{
    return res.send('Server page');
});

app.use('/auth', auth);

db_connect().then(() => {server.listen(PORT, ()=>{
    console.log(`Server is on PORT: ${PORT}!`);
})});