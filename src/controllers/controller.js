const path = require('path');
const fs = require('fs');
const _ = require("lodash"); 

/* Una nota de Cici a los profesors: No se' tanto sobre lodash pero queria ver como seria; dice que "Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.
Lodash’s modular methods are great for:

Iterating arrays, objects, & strings
Manipulating & testing values
Creating composite functions"*/

var file = '../data/products.json'
var rawdata = fs.readFileSync('../data/products.json');
var products = JSON.parse(rawdata);

module.exports = {

            test: (req,res) =>{
            console.log("corriendo las rutas? si!"); //pero quiza todavia no :/
        },

        home: (req,res) =>{
        res.render(path.resolve(__dirname, '..', 'views', 'index')); //home page
        },

         list: (req,res) =>{        
               products = JSON.parse(fs.readFileSync('../data/products.json'));    
        
               res.render(path.resolve(__dirname, '..', 'views', 'index.ejs'), { products });
        },    //Tengo que escribir Javascript en el index.ejs

        create: (req, res) =>{

        res.render(path.resolve(__dirname, '..','views','create'));

         }, 
 
        show: (req, res) =>{
              products = JSON.parse(fs.readFileSync('../data/products.json')); 
              const requestedId = _.lowerCase(req.params.id); //Cici Note: lodash doing its biz
      
                products.forEach(chocolate => {
                const storeId = _.lowerCase(chocolate.id);
        
               if(storeId === requestedId ) {
                detailChocolate = chocolate;  
           
                 }
            });
                 res.render(path.resolve(__dirname, '..','views','detail'), {detailChocolate})
    
        },
    
        save: (req,res)=>{
             const newChocolate = {
               id: req.body.id +1,
               nombre: req.body.nombre,
               descripcion: req.body.descripcion,
               precio: req.body.precio,
               descuento: req.body.descuento,
               imagen: req.files[0].filename
           
        };          

    /*   Cici's Note: Estaba experimentando con codigo de un amigo
        fs.readFile(file, (err, data) => {
          
           if (err && err.code === "ENOENT") {
           return fs.writeFile(file, JSON.stringify([obj]), error =>    console.error);  
          }
          else if (err) {
            console.error(err);
          }    
          else {
              try {
                  const fileData = JSON.parse(data);
        
                  fileData.push(newChocolate);       
                
                  return fs.writeFile(file, JSON.stringify(fileData), error => console.error)
              
                }catch(exception) {
                  console.error(exception);
              }
              let rawdata = fs.readFileSync('../data/products.json');
          }
        });   */
         
            products.push(newChocolate);
       
            let newChocolateSaved = JSON.stringify(products,null,2);
        
            fs.writeFileSync(path.resolve(__dirname,'..','data','products.json'), newChocolateSaved);
               
            res.redirect("/admin");     
        
        },

        edit: (req, res)=>{
  
            const requestedId = _.lowerCase(req.params.id);
          
            products.forEach(function(chocolate){
              console.log(chocolate.id)
              const storedId = _.lowerCase(chocolate.id);
          
              if (storedId === requestedId) {
                res.render("edit", {
                  id: chocolate.id,
                  nombre: chocolate.nombre,
                  image: chocolate.image,
                  descripcion: chocolate.descripcion,
                  precio: chocolate.precio,
                  imagen: chocolate.imagen  //yo se que necesito cambiar esto
          
                });
              }
            });     //Todavia no esta en la vista...
           
            res.redirect("/create");     
        
        },

        update: (req, res)=>{
            
                let products = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","products.json")));
              
                req.body.id = req.params.id;              
                req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
               
                let updatedProduct = products.map(chocolate => {
                    if(chocolate.id == req.body.id){
                        return chocolate = req.body;
                    }
                    return chocolate;
                });
                let productsUpdate = JSON.stringify(updatedProduct,null,2)
                
                fs.writeFileSync(path.resolve(__dirname,'..','data','products.json'),productsUpdate);
                
                res.redirect('/admin');      
        },
                
        updateHabanos(req,res){
                let productoHabanos = JSON.parse(fs.readFileSync(path.resolve(__dirname,"..", "data","habanos.json")));
                //Como por la ruta esta viajando de manera dinamica un ID hay que guardarla en una variable para poder utilizarla 
                req.body.id = req.params.id;
            
                req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
                //Aca voy a contener el nuevo habano que ya se actualizo
                let habanoUpdate = productoHabanos.map(productoHabano => {
                    if(productoHabano.id == req.body.id){
                        return productoHabano = req.body;
                    }
                    return productoHabano;
                });
                let habanosActualizar = JSON.stringify(habanoUpdate,null,2)
                //Aqui sobre escribo nuestro archivo Json para guardar los nuevos productos
                fs.writeFileSync(path.resolve(__dirname,'..','data','habanos.json'),habanosActualizar);
                //Aqui redireccionamos los nuevos productos a la vista administrar
                res.redirect('/admin');      

        },

        eliminate: (req, res) => {
          
            const elimId = _.lowerCase(req.params.id);
           
            const productsFinal = products.filter(chocolate => chocolate.id != elimId);
            
            let productSave = JSON.stringify(productsFinal,null,2)
            
            fs.writeFileSync(path.resolve(__dirname,'..','data','products.json'),productSave);
            
            res.redirect('/admin');
        
            }
        
        }
        
            
