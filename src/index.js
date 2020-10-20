const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const server = express(); 
const path = require('path');
const PORT = process.env.PORT || 3001; 


/**************************************************************************** */
/* DataBase configuration. 
***************************************************************************** */

const URI = "mongodb+srv://PabloFonsecaMoncada:mongodb2019Pass!@jwtcluster.3v6bu.mongodb.net/<JWTDB>?retryWrites=true&w=majority";

/**
 * Avoiding Deprecation Messages. 
 */
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(URI)
.then(() => {
    console.log("Success connecting to MongoDB.");
    //Basic Port Listening Configuration. 
    server.listen(PORT, ()=>{
        console.log(`App running at localhost: ${PORT}`);
    });
})
.catch(() => console.log);


/**************************************************************************** */
/* Server configuration. 
***************************************************************************** */
//Morgan configuration like middleware between connections. 
server.use(morgan('dev'));

server.use(express.static(path.join(__dirname, "/public")));

//Set default view engine.
server.set('view engine', 'ejs');

//Set another default directory for the views files. 
server.set('views', path.join(__dirname, '/views'))
/**************************************************************************** */

//Basic Web API.
server.get('/', function(request, response){
    response.render("index");
    response.statusCode = 200;
    response.end(); 
});

server.get('/smoothies', function(request, response){
    response.redirect('/');
    response.statusCode = 300;
    console.log("So you want a smoothie ha!"); 
    response.end(); 
});
