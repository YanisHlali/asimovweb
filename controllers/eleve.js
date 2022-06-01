const modelsEleve = require('../models/eleve');

async function getEleve(req, res) {
    modelsEleve.afficherEleveWithClasse(req.params.id)
        .then(result => {
            res.render('ajouterEleve', { data: result })
        })
        .catch(err => {
            console.log(err)
        })
}

async function creerEleve(req, res) {
    const { nom, prenom, pseudo, mdp, classe } = req.body
    console.log(nom, prenom, pseudo, mdp, classe)
    modelsEleve.creerEleve(nom,prenom,pseudo,mdp,1,classe)
        .then(result => {
            res.redirect("/classe/2")
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    getEleve,
    creerEleve
}