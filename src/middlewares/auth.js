const fs = require('fs');
const path = require('path');

let archivoUsuarios =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/user.json')));
        
module.exports = (req,res,next) =>{
    //Variable locals (super global - vive en las vistas )
    res.locals.usuario = false;
    //If your session exists
    if(req.session.usuario){
        res.locals.usuario = req.session.usuario;
        return next();
    }else if(req.cookies.email){
        let usuario = archivoUsuarios.find(usuario => usuario.email == req.cookies.email)
        //return res.send(usuario);
        //delete usuario.password;
        //Here you have to create the session because you have a cookie active.
        req.session.usuario = usuario;
        //res is the global variable that will be used all over the website
        res.locals.usuario = usuario;
        
        return next();
    }else{
        return next();
    }
}