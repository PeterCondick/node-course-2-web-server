const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var logMess = `${now}: ${req.method} ${req.url}`;
  console.log(logMess);
  fs.appendFile('server.log', logMess + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintanence.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Hello to this website!'
  });
});

// app.get('/about/foo', (req, res) => {
//   res.send('About Foo page');
// });

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About rendered page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'it all went wrong'
  });
});


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
