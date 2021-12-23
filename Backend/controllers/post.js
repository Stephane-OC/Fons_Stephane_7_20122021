const { pool } = require('../config/db');
const fs = require("fs");

//Display all post from first to last

exports.getAll = (req, res, next) => {

    let sql = "SELECT * FROM post p JOIN user WHERE user.id=authorId ORDER BY date DESC LIMIT 50;";

    pool.execute(sql, function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}


//Display the post by users from first to last
exports.getByAuthor = (req, res, next) => {

    let sql = `SELECT * FROM post JOIN user WHERE user.id=authorId AND authorId=? ORDER BY date DESC;`;

    pool.execute(sql, [req.body.id], function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}


////////////////////////////  A VENIR  ////////////////////////////

//Creation d'un nouveau post 




//Suppression d'un post 




//Modifications d'un post