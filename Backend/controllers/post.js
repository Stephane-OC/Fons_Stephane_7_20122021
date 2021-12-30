const { pool } = require('../config/db');
const fs = require("fs");



/*  Post controllers, here are all the Post controllers we use SQL DB   **  
**  "getByAuthor" to Get Post by his author                             **
**  "getAll" to get back all the user's Post correctly                  **
**  "create" to make users able to create a post with photo and text    **
**  "modify" to make user able to modify his own Post                   **
**  "delete" function to make user able to delete his own Post          */ 


////////////////////////////  Get all Post Function  ////////////////////////////

//Display all post from first to last

exports.getAll = (req, res, next) => {
    // Get All Post from the last to the first
    let sql = "SELECT * FROM post JOIN user WHERE user.id=authorId ORDER BY date DESC LIMIT 50;";

    pool.execute(sql, function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}

////////////////////////////  Get Post by Author Function  ////////////////////////////

//Display the post by users from first to last
exports.getByAuthor = (req, res, next) => {

    let sql = `SELECT * FROM post JOIN user WHERE user.id=authorId AND authorId=? ORDER BY date DESC;`;

    pool.execute(sql, [req.body.id], function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}

////////////////////////////  Post Creation Function  ////////////////////////////

exports.create = (req, res, next) => {
    // Here are defined all filled fields 
    const image = (req.file) ? `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}` : "";
    const textSend = (req.body.text) ? req.body.text : " ";
    const post = {
        text: textSend,
        imageUrl: image,
        like: 0,
        date: new Date().toLocaleString("af-ZA", { timeZone: "Europe/Paris" }),
        authorId: req.body.userId,
    };
    // Here the request use "multer" management to be sent, and default values
    let sql = `INSERT INTO post (text, imageUrl, date, authorId) VALUES (?,?,?,?);`;
    pool.execute(sql, [post.text, post.imageUrl, post.date, post.authorId], function (err, result) {
        if (err) throw err;
        res.status(201).json({ message: `Post ajouté` });
    })
};



////////////////////////////  Modify Post Function  ////////////////////////////


exports.modify = (req, res, next) => {
    if (req.file) {
        let sql = `SELECT * FROM post WHERE id = ?`;
        pool.execute(sql, [req.params.id], function (err, result) {
            if (err) res.status(400).json({ err });
            if (!result[0]) res.status(400).json({ message: "L'ID ne correspond pas !" });
            else {
                // If the post has a picture, delete her from the "post" folder
                if (result[0].imageUrl != "") {
                    const name = result[0].imageUrl.split('/images/post/')[1];
                    fs.unlink(`images/${name}`, () => {
                        if (err) console.log(err);
                        else console.log('Image modifiée !');
                    })
                }
                // Get back informations from the "Frontend" side 
                let image = (req.file) ? `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}` : "";
                let textSend = (req.body.post) ? req.body.post.text : " ";
                const post = {
                    text: textSend,
                    imageUrl: image,
                    date: new Date().toLocaleString("af-ZA", { timeZone: "Europe/Paris" })
                };
                // Here we Update the DataBase
                let sql2 = `UPDATE post
                SET text = ?, imageUrl= ?, date = ?
                WHERE id = ?`;
                pool.execute(sql2, [post.textSend, post.imageUrl, post.date, req.params.id], function (err, result) {
                    if (err) throw err;
                    res.status(201).json({ message: `Post udpate` });
                });
            }
        });
    } else {
        // Get back informations from the "Frontend" side 
        const textSend = (req.body.post) ? req.body.post.text : " ";
        const post = {
            text: textSend,
            date: new Date().toLocaleString("af-ZA", { timeZone: "Europe/Paris" })
        };
        // Here we Update the DataBase
        let sql2 = `UPDATE post
                SET text = ?, date =?
                WHERE id = ?`;
        pool.execute(sql2, [post.text, post.date, req.params.id], function (err, result) {
            if (err) throw err;
            res.status(201).json({ message: `Post update` });
        });
    }
};


////////////////////////////  Delete a post Function  ////////////////////////////

exports.delete = (req, res, next) => {
    let sql = `SELECT * FROM post WHERE postId = ?`;
    pool.execute(sql, [req.params.id], function (err, result) {
        if (err) res.status(400).json({ err });
        if (!result[0]) res.status(400).json({ message: "L'ID ne correspond pas !" });
        else {
            if (result[0].authorId == req.body.userId || req.body.admin == true) {
                // If the post has a picture, delete it
                if (result[0].imageUrl != "") {
                    const name = result[0].imageUrl.split('/images/post/')[1];
                    //
                    fs.unlink(`images/post/${name}`, () => {
                        if (err) console.log(err);
                        else console.log('Image supprimée !');
                    })
                }
                // Delete the post from the DataBase
                let sql2 = `DELETE FROM post WHERE postId = ?`;
                pool.execute(sql2, [req.params.id], function (err, result) {
                    if (err) throw err;
                    res.status(201).json({ message: `Post supprimé` });
                });
            } else {
                res.status(401).json({message : "Vous n'êtes pas autorisé à effectuer cette action"});
            }

        }
    });
};