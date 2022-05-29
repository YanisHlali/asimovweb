const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');


const modelsClasse = require('./models/professeur.js');

modelsClasse.afficherProfesseurByClasse(8)
.then(result => {
    console.log(result)
})




app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.urlencoded({ extended: true}));

app.listen(port, () => {
    console.log('Ecoute du port ' + port);
});