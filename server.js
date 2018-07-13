const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//Heroku dynamic port or local port
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

//Writing specific middleware in Express
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });

    next();
});

hbs.registerHelper('getCurrentYear', () => {   
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');

    /* res.send({
        name: 'Hugo Martinez',
        likes: [
            'Handball',
            'Computing'
        ]
    }); */

    res.render('home.hbs', {
        pageTitle: 'The Home Page',
        welcomeMessage: 'Hello HMA! :)'
    });
});

app.get('/about', (req, res) => {
    //res.send('<h1>About Page</h1>');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {    
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});