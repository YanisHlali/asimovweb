const bdd = require('./bdd.js');


// -------------------- CREER --------------------
async function creerEvaluation(titre,note,idEleve,idMatiere) {
    // Création de l'évaluation
    bdd.query(`INSERT INTO evaluation (titre_evaluation,note_evaluation,idEleve_evaluation,idMatiere_evaluation)
    VALUES ('${titre}',${note},${idEleve},${idMatiere})`,
    (err) => { if (err) throw err; });
}

// -------------------- LIRE --------------------
async function afficherEvaluation(id) {
    return new Promise((resolve,reject) => {
        // Récupération de l'évaluation
        bdd.query(`SELECT * FROM evaluation WHERE id_evaluation=${id}`, (err,result) => {
            if (err) throw err; 
            resolve(result);
        });
    });
}

async function afficherEvaluationByClasse(idClasse) {
    return new Promise((resolve,reject) => {
        // Récupération de tous les évaluations
        bdd.query(`SELECT * FROM evaluation,classe,eleve WHERE idEleve_evaluation=id_eleve AND idClasse_eleve=id_classe 
        AND id_classe=${idClasse}`,
        (err,result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}

// -------------------- MODIFIER --------------------
async function modifierEvaluation(id,titre,note,idEleve,idMatiere) {
    // Modification de l'évaluation
    bdd.query(`UPDATE evaluation 
    SET titre_evaluation='${titre}',
    note_evaluation=${note},
    idEleve_evaluation=${idEleve},
    idMatiere_evaluation=${idMatiere}
    WHERE id_evaluation=${id}`,
    (err) => { if (err) throw err; });
}


// -------------------- SUPPRIMER --------------------
async function supprimerEvaluation(id) {
    // Suppression de l'évaluation
    bdd.query(`DELETE FROM evaluation WHERE id_evaluation=${id}`,
    (err) => { if (err) throw err; });
}

module.exports = {
    creerEvaluation,
    afficherEvaluation,
    afficherEvaluationByClasse,
    modifierEvaluation,
    supprimerEvaluation
}