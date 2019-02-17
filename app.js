const express = require('express');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const fs = require('fs');

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

// Bootstrap directory 
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// Read the json file to populate the input field "Fecha estimada de entrega" of component product-buy
// This json is sent as an argument at render function of Home Route.
const jsonDeliveryDates = fs.readFileSync('views/assets/jsons/delivery-date.json', 'utf8');

// Home Route
app.get('/', (req, res) => {    
    res.render('index', {
        deliveryDates: JSON.parse(jsonDeliveryDates)
    });
});

// Start Server
app.listen(3000, () => {
    console.log('Server started on port 3000...');
});