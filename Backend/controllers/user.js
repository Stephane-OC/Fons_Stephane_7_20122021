const { pool } = require('../config/db');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();
const fs = require("fs");


/*  User's controllers, here are all the user's controllers we use SQL DB **
**  Signup Funtion, to create an user, with all informations required     **  
**  Secure Login Function, to make all the needed to be connect           **
**  getOne & getAs to get back all the user's informations correctly      */

////////////////////////////  Signup Function  ////////////////////////////

exports.signup = (req, res, next) => {

    let sql = `SELECT * FROM user WHERE email=?`;

    pool.execute(sql, [req.body.email], function (err, result) {
        let user = result[0];
        if (!user) {
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const image = `${req.protocol}://${req.get('host')}/images/profile/pp.png`;
                    const user = {
                        nom: req.body.nom,
                        prenom: req.body.prenom,
                        email: req.body.email,
                        password: hash,
                        imageUrl: image,
                    }
                    let sql = `INSERT INTO user (nom, prenom, email, password, pp) VALUES (?,?,?,?,?)`;

                    pool.execute(sql, [user.nom, user.prenom, user.email, user.password, user.imageUrl], function (err, result) {
                        if (err) throw err;
                        res.status(201).json({ message: `Utilisateur ${user.prenom} ajouté` });
                    })
                })
                .catch(error => res.status(500).json({ error }));
        } else {
            res.status(401).json({ message: "Email déja utilisé, veuillez mettre une autre adresse Email" })
        }
    })

};


////////////////////////////  Login Function  ////////////////////////////

exports.login = (req, res, next) => {

    let sql = `SELECT * FROM user WHERE email=?`;
    
    pool.execute(sql, [req.body.email], function (err, result) {
        let user = result[0];
        if (!user) return res.status(401).json({ error: "Email incorrect" });
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: " Mot de passe incorrect !" })
                }
                console.log("Utilisateur connecté");
                res.status(200).json({
                    userId: user.id,
                    token: jwt.sign(
                        { userId: user.id },
                        process.env.SECRET_TOKEN_KEY,
                        { expiresIn: "24h" },
                    ),
                })
            })
            .catch(error => res.status(500).json({ message: "Erreur d'Authentification" }));
    })
};

////////////////////////////  Get One User Function  ////////////////////////////

exports.getOne = (req, res, next) => {

    let sql = `SELECT * FROM user WHERE user.id=${req.body.userId};`;

    pool.execute(sql, function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}

////////////////////////////  Get One User by "nom" or "prenom" Function  ////////////////////////////
exports.getAs = (req, res, next) => {

    let sql = `SELECT * FROM user WHERE nom LIKE '%${req.body.nom}%' OR prenom LIKE '%${req.body.nom}%' LIMIT 12;`;

    pool.execute(sql, [req.body.nom], function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}

////////////////////////////  A VENIR  ////////////////////////////

//Modification du Mot de passe utilisateur 




//Modification image profil utilisateur




//Modifications des informations des utilisateurs (Nom - Prenom...)