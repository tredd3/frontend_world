const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');
const router = require('./routes/api/members');
//using express with socket.io - below is the procedure to share the https server
//var http = require('http').Server(app)
//var io=require('socket.io)(http)

//on the client side we do var socket=io() which then it tries to make a connection to the socket io server
//running on the same host on which the current website is hosted 

const app = express();

// Init middleware
app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Member App',
    members
  })
);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//usersList=[]
// io.on('connection',(socket)=>{
// usersList.push(socket)
//   console.log('user connected')
// })

//http.listen instead of app.listen so that both socket.io and express can run together by using the same node http server 
//if use app.listen then only express will run and u need to create a separate http server for socket.io