const { pool } = require('../config/db');

/*  comments controllers, here are all the comments controllers we use SQL DB   ** 
**  "create" to make users able to create a comment                             **
**  "getAll" to get back all the user's comment                                 **
**  "delete" function to make user able to delete his own comment               */


////////////////////////////  create a Post Function  ////////////////////////////

exports.create = (req, res, next) => {
    // here we define all the fields that will be filled in
    const post = {
        comment: req.body.comment,
        authorId: req.body.authorId,
        postId: req.body.postId,
        //AJOUTER UNE DATE AUX COMMENTAIRES
    };
    let sql = `UPDATE post SET post.comment = post.comment + 1 WHERE postId=?;`;
    pool.execute(sql, [req.body.postId], function (err, result) {
        if (err) res.status(400).json({ err });
        let sql = `INSERT INTO comment (comments, authorId, postId) VALUES (?,?,?);`;
        pool.execute(sql, [req.body.comment, req.body.authorId, req.body.postId], function (err, result) {
            if (err) throw err;
            console.log(result)
            res.status(201).json({ message: `Commentaire ajouté` });
        })
    });
};

////////////////////////////  Get all comment Function  ////////////////////////////

exports.getAll = (req, res, next) => {
    let sql = `SELECT 
    idComment, comments, nom, prenom
FROM
    comment
        JOIN
    user ON comment.authorId = user.id
    WHERE comment.postId = ?
ORDER BY idComment;`;
    pool.execute(sql, [postId], function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}

////////////////////////////  Delete a comment Function  ////////////////////////////

exports.delete = (req, res, next) => {
    let sql3 = `SELECT * from comment WHERE idComment=?`;
    pool.execute(sql3, [req.params.commentId], function (err, result) {
        if (result[0].authorId == req.body.userId || req.body.admin == true) {
            if (err) res.status(400).json({ err });
            let sql2 = `DELETE from comment WHERE idComment=?;`;
            pool.execute(sql2, [req.params.commentId], function (err, result) {
                if (err) res.status(400).json({ err });
                let sql = `UPDATE post SET post.comment = post.comment - 1 WHERE postId=?;`;
                pool.execute(sql, [req.params.postId], function (err, result) {
                    if (err) res.status(400).json({ err });
                    res.status(200).json(result)
                });
            })
        } else {
            res.status(400).json({ message : "Vous n'êtes pas autorisé à effectuer cette action !" });   
        }
    });

}