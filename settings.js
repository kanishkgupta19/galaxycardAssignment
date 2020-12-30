const exp = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = exp();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

// Setting template Engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, "templates"));
app.use('/assets', exp.static(path.join(__dirname, "assets")));

module.exports=app;
global.app=app;