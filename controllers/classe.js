const modelsClasse = require('../models/classe');

async function getAllClasses(req,res) {
    modelsClasse.afficherClasses()
    .then(result => {
        res.render('ajouterEleve', { data: result })
    })
    .catch(err => {
        console.log(err)
    })
}


async function getClasse(req,res) {
    modelsClasse.afficherClasseById(req.params.id)
    .then(result => {
        res.render('classe', { data: result})
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports = {
    getClasse,
    getAllClasses
}