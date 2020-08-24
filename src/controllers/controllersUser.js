const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const _ = require("lodash");
//Include User from model
const db = require('../database/models')
const User = db.User;

const {
  check,
  validationResult,
  body
} = require('express-validator');
const { REPL_MODE_SLOPPY } = require('repl');

module.exports = {
    registro: (req,res) =>{
        res.render(path.resolve(__dirname, '../views/usuarios/registro'));
    },
    create: (req, res) => {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        //Create _body variable which contains user's information gathered from the body
        const _body = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          province: Number(req.body.province),
          country: req.body.country,
          avatar:  req.file ? req.file.filename : '',
          role: 1   //Usuario 1 = Basico 2 = analista 9 = Administrador
        }
        //User model must be created as well as the user table in the Data Base
        User
          .create(_body)
          .then(user =>{
              res.redirect('/administrar')
          })
          .catch(error => res.send(error));     //error de Base de Datos
        //JSON logic - User Management
        //This section is comented out as we are working with Sequelize  
        /*let archivoUsers = fs.readFileSync(path.resolve(__dirname, '../data/user.json'), {
          encoding: 'utf-8'
        });
        let users;
        if (archivoUsers == "") {
          users = [];
        } else {
          users = JSON.parse(archivoUsers);
        };
        users.push(user);
        usersJSON = JSON.stringify(users, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../data/user.json'), usersJSON);*/
        
        res.redirect('/login');     
      } else {
      
        return res.render(path.resolve(__dirname, '../views/usuarios/registro'), {
          errors: errors.errors,  old: req.body
        });
      }
    },
    //Suggestion: this method should be renamed - login_form ?
    login: function(req,res){
        res.render(path.resolve(__dirname,'..','views','usuarios','login'))
    },
    //Suggestion: this method should be renamed - login ?
    ingresar: (req,res) =>{
      console.log("Starting ingresar");
      const errors = validationResult(req);
      console.log("After validations");
      let authenticatedUser;
      //return res.send(errors.mapped());
      if(errors.isEmpty() ) {
        User.findOne({
          where: {
            email: req.body.email},
              //email: "daniel2@gmail.com" //Testing with a not registered e-mail
      })
      .then(user =>{
          //User must exist, otherwise we cannot re-assign session and locals variables values
          if(user){
              console.log(user.dataValues);
              
              if (bcrypt.compareSync(req.body.password, user.password)) {
                //console.log("Authenticated!");
                authenticatedUser = user.dataValues;
                req.session.usuario = authenticatedUser;
                res.locals.usuario = authenticatedUser;
                req.session.authenticated = true;
                if(req.body.recordarme){
                  //Creaqting user's cookie
                  res.cookie('email', authenticatedUser.email,{maxAge: 1000 * 60 * 60 * 24})
                }
                //console.log("Antes de redirect");
                res.redirect('/');
                //return next();  
              }
          }     
      })
      .catch(error => res.send(error));
        //JSON logic - User Management
        //This section is comented out as we are working with Sequelize
        /*let archivoUsers = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/user.json')));
        let userLogged;
        const requestedEmail = _.lowerCase(req.body.email);
        archivoUsers.forEach(function(element) {
          const emailStored = _.lowerCase(element.email);
          if (requestedEmail === emailStored) {

            element.password='';
            userLogged = element;
          }  

        });*/
        //req.session.usuario = userLogged;
        //res.locals.usuario = userLogged;
        //req.session.authenticated = true;


      }else{
        return res.render(path.resolve(__dirname, '../views/usuarios/login'), {
          errors: errors.mapped(),  old: req.body});       
      }

    },
    logout: (req,res) =>{
      req.session.destroy();
      res.cookie('email',null,{maxAge: -1});
      res.redirect('/')
    }

}
