const path = require('path');

module.exports = {
    register: function (req,res){
        res.render(path.resolve(__dirname, '..', 'views', 'users', 'register'));
    },

    cartshow: function (req,res){
    res.render(path.resolve(__dirname, '..', 'views', 'users', 'productCart'));
    }

}