const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try{
        const token = req.body.token
        console.log("token = "+ token)
        const decode = jwt.verify(token, 'secret', (err, decode) =>{
            if(err)
            {
                console.log(err)
            }
            else{
                console.log("token accepted")
                console.log(decode)
                req.user = "token accepted"
            }
        })
        next();
    }
    catch{
        res.status(401).send("auth failed")
    }
}