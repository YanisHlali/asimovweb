const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.urlencoded({ extended: true}));

const routeur = require('./routes/route')

app.use('/', routeur);;

app.listen(port, () => {
    console.log('Ecoute du port ' + port);
});