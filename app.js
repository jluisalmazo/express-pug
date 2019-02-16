const express = require('express');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');

// Init App
const app = express();

// Load View Engine (PUG)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Sass config
app.use(
    express.static(__dirname + '/views/'),
    sassMiddleware({
        src: __dirname + '/views', 
        dest: __dirname + '/views',
        debug: true
    })
);

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// Home Route
app.get('/', (req, res) => {    
    res.render('index', {
        title: 'Prueba',
    });
});

// Start Server
app.listen(3000, () => {
    console.log('Server started on port 3000...');
});