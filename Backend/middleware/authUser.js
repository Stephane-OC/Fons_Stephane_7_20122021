const jwt = require("jsonwebtoken");//Jsonwebtoken is use to crypt and ancrypt tokens

/*********************************************************************************/
//Authentification module


module.exports = (req,res,next) => {
    try{
        //Spliting header request to only have the Token
        const token = req.headers.authorization.split(' ')[1];
        //Token decode with secret key
        const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN_KEY);
        /** If User ID doesn't match to the token        ** 
        **  message sended to indicate "unauthorized request" */
        if (!decodedToken) {
            return res.status(403).json("unauthorized request")
        //else the next Middleware will be called    
        }else{
            next();
        }
    }catch(e){
        res.status(401).json({error:'Invalid request!'});
    }
}


