const jwt = require('jsonwebtoken'); //Jsonwebtoken is use to crypt and ancrypt tokens

/*********************************************************************************/
//Authentification module

module.exports = ( req, res, next ) => { 
    try {
        //Spliting header request to only have the Token
        const token = req.headers.authorization.split(' ')[1]; 
        //Token decode with secret key
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY); 
        //Token Verification in a "const"
        const userId = decodedToken.userId; 
        req.auth = { userId: userId};

        /** If User ID doesn't match to the token        ** 
        **  message sended to indicate "unauthorized request" */
        if (req.body.userId && req.body.userId !== userId) { 
            return res.status(403).json("unauthorized request") 
        } else {
            //else the next Middleware will be called
            next(); 
        }
    }
    catch {
        res.status(401).json({error: new Error('Invalid Request!')})

    }
}


module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN_KEY);
        if (!decodedToken) {
            return res.status(403).json("unauthorized request")
        }else{
            next();
        }
    }catch(e){
        res.status(401).json({error:'Invalid request!'});
    }
}
