const path = require('path');
const fs = require('fs');

//let chocolates =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','chocolates.json'))); //


module.exports = {
    index: function(req,res){
        res.render(path.resolve(__dirname, '..', 'views','web','index'),{chocolates});  
    },

    show: function(req,res){
        res.render(path.resolve(__dirname, '..', 'views','web','productDetalle'),{chocolates});  
    }

}
