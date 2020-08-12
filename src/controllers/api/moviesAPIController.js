/* const db = require('../../database/models');

const moviesController = {
    list: function(req,res) {
        db.Peliculas.findAll ({
            include: [{association:'genero'}{association:'example'}]
        })
        .then(function(peliculas)) {
            let repuesta = {
                meta:{
                status: 200,
                total: peliculas.length
            },
                data: peliculas;
            };

            res.json(respuesta);
        }
    }
    
    */
