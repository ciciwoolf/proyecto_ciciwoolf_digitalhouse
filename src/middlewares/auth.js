const fs = require('fs');
const path = require('path');
//Include User from model
const db = require('../database/models')
const User = db.User; 

/* JSON logic
let archivoUsuarios =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/user.json')));
*/        
module.exports = (req,res,next) =>{
    //Variable locals (super global - vive en las vistas )
    res.locals.usuario = false;
    //If your session exists
    if(req.session.usuario){
        res.locals.usuario = req.session.usuario;
        return next();
    }else if(req.cookies.email){
        console.log("If cookie");
        console.log(req.cookies.email);
        //Find User cookie from Database
        User.findOne({
            where: {
                email: req.cookies.email
                //email: "daniel2@gmail.com" //Testing with a non registered e-mail
            }

        })
        .then(user =>{
            //User must exist, otherwise we cannot re-assign session and locals variables values
            if(user){
                //console.log(user);
                req.session.usuario = user;
                res.locals.usuario = user;
            }
            return next();    
        })
        .catch(error => res.send(error)); 
        //JSON Logic
        //This section is comented out as we are working with Sequelize 
        //let usuario = archivoUsuarios.find(usuario => usuario.email == req.cookies.email)
        //return res.send(usuario);
        //delete usuario.password;
        //Here you have to create the session because you have a cookie active.
        //req.session.usuario = usuario;
        //res is the global variable that will be used all over the website
        //res.locals.usuario = usuario;
        //return next();
    }else{
        return next();
    }
}