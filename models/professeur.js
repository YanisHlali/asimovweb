const bdd = require('./bdd.js');


// -------------------- CREER --------------------
async function creerProfesseur(nom,prenom,pseudo,mdp,estProfPrincipale,estProviseur,idMatiere) {
    // Création du professeur
    bdd.query(`INSERT INTO professeur (nom_professeur,prenom_professeur,pseudo_professeur,mdp_professeur,
    estProfPrincipal_professeur,estProviseur_professeur,idMatiere_professeur) VALUES 
    ('${nom}','${prenom}','${pseudo}','${mdp}',${estProfPrincipale},${estProviseur},${idMatiere})`,
    (err) => { if (err) throw err; });
}

// -------------------- LIRE --------------------
async function afficherProfesseur(id) {
    return new Promise((resolve,reject) => {
        // Récupération du professeur
        bdd.query(`SELECT * FROM professeur WHERE id_professeur=${id}`, (err,result) => {
            if (err) throw err; 
            resolve(result);
        });
    });
}

async function afficherProfesseurByClasse(idClasse) {
    return new Promise((resolve,reject) => {
        // Récupération du professeur de la classe
        bdd.query(`SELECT * FROM professeur,classe,enseigner WHERE idProfesseur_enseigner=id_professeur AND
        idEnseigner_classe=id_enseigner AND id_classe=${idClasse}`,
        (err,result) => {
            if (err) throw err; 
            resolve(result);
        });
    });
}

// -------------------- MODIFIER --------------------
async function modifierProfesseur(id,nom,prenom,pseudo,mdp,estProfPrincipale,estProviseur,idMatiere) {
    // Modification du professeur
    bdd.query(`UPDATE professeur 
    SET nom_professeur='${nom}',
    prenom_professeur='${prenom}',
    pseudo_professeur='${pseudo}',
    mdp_professeur='${mdp}',
    estProfPrincipale_professeur=${estProfPrincipale},
    estProviseur_professeur=${estProviseur},
    idMatiere_professeur=${idMatiere}
    WHERE id_professeur=${id}`,
    (err) => { if (err) throw err; });
}

// -------------------- SUPPRIMER --------------------
async function supprimerProfesseur(id) {
    // Suppression du professeur
    bdd.query(`DELETE FROM professeur WHERE id_professeur=${id}`,
    (err) => { if (err) throw err; });
}

module.exports = {
    creerProfesseur,
    afficherProfesseur,
    afficherProfesseurByClasse,
    modifierProfesseur,
    supprimerProfesseur
}