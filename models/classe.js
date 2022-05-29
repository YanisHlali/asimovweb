const bdd = require('./bdd.js');


// -------------------- CREER --------------------
async function creerClasse(nom,idMatiere,idProfesseur) {
    // Création de l'enseignement
    bdd.query(`INSERT INTO enseigner (idMatiere_enseigner,idProfesseur_enseigner)
    VALUES (${idMatiere},${idProfesseur})`, (err) => { if (err) throw err; });
    // Récupération de l'enseignement crée le plus récemment pour ...
    bdd.query(`SELECT * FROM enseigner ORDER BY id_enseigner DESC LIMIT 1`, (err,result) => {
        if (err) throw err;
        // ... crée la classe
        bdd.query(`INSERT INTO classe (nom_classe,idEnseigner_classe) VALUES ('${nom}',${result[0].id_enseigner})`,
        (err) => { if (err) throw err; });
    });
}

// -------------------- LIRE --------------------
async function afficherClasses() {
    return new Promise((resolve,reject) => {
        // Récupération de toutes les classes
        bdd.query(`SELECT * FROM classe,eleve WHERE classe.id_classe=eleve.idClasse_eleve ORDER BY nom_classe`,
        (err,result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}

async function afficherClasseById(id) {
    return new Promise((resolve,reject) => {
        // Récupération de la classe
        bdd.query(`SELECT * FROM classe,eleve WHERE classe.id_classe=eleve.idClasse_eleve
        AND id_classe=${id} ORDER BY nom_classe`, (err,result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}

// -------------------- MODIFIER --------------------
async function modifierClasse(id,nom,idMatiere,idProfesseur) {
    // Récupération de l'id enseigner assignée à la classe pour ...
    getIdEnseigner(id)
    .then(result => {
        // ... modifier l'enseignement
        let idEnseigner = result[0].id_enseigner;
        bdd.query(`UPDATE enseigner SET idMatiere_enseigner=${idMatiere},
        idProfesseur_enseigner=${idProfesseur} WHERE id_enseigner=${idEnseigner}`,
        (err) => { if (err) throw err; });
    })
    // Modification du nom de la classe
    bdd.query(`UPDATE classe SET nom_classe='${nom}' WHERE id_classe=${id}`,
    (err) => { if (err) throw err; });
}

// -------------------- SUPPRIMER --------------------
async function supprimerClasse(id) {
    // Récupération de l'id de l'enseignement assignée à la classe
    getIdEnseigner(id)
    .then(result => {
        let idEnseigner = result[0].id_enseigner;
        // Suppression de la classe
        bdd.query(`DELETE FROM classe WHERE id_classe=${id}`,
        (err) => { if (err) throw err; });
        // Suppression de l'enseignement
        bdd.query(`DELETE FROM enseigner WHERE id_enseigner=${idEnseigner}`,
        (err) => { if (err) throw err; });
        // Récupération de tous les élèves de la classe pour ...
        bdd.query(`SELECT * FROM eleve,classe WHERE idClasse_eleve=id_classe AND id_classe=${id}`,
        (err,result) => {
            if (err) throw err;
            for (let i = 0; i < result.length; i++) {
                // ... mettre à jour leur classe
                bdd.query(`UPDATE eleve SET idClasse_eleve=NULL WHERE idClasse_eleve=${id}`,
                (err) => { if (err) throw err; });
            }
        })
    })
}
// -------------------- FONCTIONS ANNEXES --------------------
async function getIdEnseigner(id) {
    return new Promise((resolve,reject) => {
        // Récupération de l'enseignement assignée à la classe
        bdd.query(`SELECT id_enseigner FROM enseigner,classe WHERE id_enseigner=idEnseigner_classe 
        AND id_classe=${id}`, (err,result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}

module.exports = {
    creerClasse,
    afficherClasses,
    afficherClasseById,
    modifierClasse,
    supprimerClasse
}