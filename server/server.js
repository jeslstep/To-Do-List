console.log('running'); 

// requiring routes
const todoRouter = require('./routes/todoRouter.js');

// bringing/sourcing in express 
const express = require('express');

// creating an instance of express
const app = express();

// tell express where to find public files when it gets HTTP requests
app.use(express.static('server/public'));

// tell express to listen for requests on a specific port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('up and running on port ', port);
});

// bodyParser set up 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// direct '/todo' url requests to this file
app.use('/tasks', todoRouter);