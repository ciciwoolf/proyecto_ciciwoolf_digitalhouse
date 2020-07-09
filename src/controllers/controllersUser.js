const path = require('path');

module.exports = {
    registro: function (req,res){
        res.sendFile(path.resolve(__dirname, '..', 'views', 'usuarios', 'registro.html'));
    },
    login: function(req,res){
        res.sendFile(path.resolve(__dirname,'..','views','usuarios','login.html'))
    }
}