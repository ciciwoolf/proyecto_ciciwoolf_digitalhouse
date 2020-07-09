const path = require('path');
const fs = require('fs');

let relojes =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','relojes.json')));


module.exports = {
    index: function(req,res){
        //res.sendFile(path.resolve(__dirname, '..', 'views','web','index.html'));
        res.render(path.resolve(__dirname, '..', 'views','web','index'),{relojes});
    },
    nosotros: function(req,res){
        res.sendFile(path.resolve(__dirname, '..', 'views','web','nosotros.html'))
    },
    contacto: function(req,res){
        res.sendFile(path.resolve(__dirname, '..', 'views','web','contacto.html'))
    }

}