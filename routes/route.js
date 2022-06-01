const express = require("express")
const routeur = express.Router();
const controllersClasse = require('../controllers/classe');
const controllersEleve= require('../controllers/eleve');


routeur
.get('/classe/:id', controllersClasse.getClasse)
.get('/eleve/ajouter', controllersClasse.getAllClasses)
.post('/eleve/ajouter', controllersEleve.creerEleve)

module.exports = routeur