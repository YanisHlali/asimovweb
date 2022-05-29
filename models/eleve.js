const bdd = require('./bdd.js');


// -------------------- CREER --------------------
async function creerEleve(nom,prenom,pseudo,mdp,estActif,idClasse) {
    // Création de l'élève
    bdd.query(`INSERT INTO eleve (nom_eleve,prenom_eleve,pseudo_eleve,mdp_eleve,estActif_eleve,idClasse_eleve)
    VALUES ('${nom}','${prenom}','${pseudo}','${mdp}',${estActif},${idClasse})`,
    (err) => { if (err) throw err; });
}

// -------------------- LIRE --------------------
async function afficherEleve(id) {
    return new Promise((resolve,reject) => {
        // Récupération de l'élève
        bdd.query(`SELECT * FROM eleve WHERE id_eleve=${id}`, (err,result) => {
            if (err) throw err; 
            resolve(result);
        });
    });
}

// -------------------- MODIFIER --------------------
async function modifierEleve(id,nom,prenom,pseudo,mdp,estActif,idClasse) {
    // Modification de l'élève
    bdd.query(`UPDATE eleve 
    SET nom_eleve='${nom}',
    prenom_eleve='${prenom}',
    pseudo_eleve='${pseudo}',
    mdp_eleve='${mdp}',
    estActif_eleve=${estActif},
    idClasse_eleve=${idClasse}
    WHERE id_eleve=${id}`,
    (err) => { if (err) throw err; });
}

// -------------------- SUPPRIMER --------------------
async function supprimerEleve(id) {
    // Suppression de l'élève
    bdd.query(`DELETE FROM eleve WHERE id_eleve=${id}`,
    (err) => { if (err) throw err; });
}

module.exports = {
    creerEleve,
    afficherEleve,
    modifierEleve,
    supprimerEleve
}