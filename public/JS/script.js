window.addEventListener('load',function(){

    //Remember to use JSONstringify when storing values more complex than strings of texts.
    
    //Capturas de elementos
    /*
    let formulario = document.getElementById('formulario');
    let ulErrores = document.getElementById('errores');
    let selectProvincias =  document.querySelector('#provincias'); */
    //Change to country API

      
    if (localStorage.getItem('nombreUsuario')==null) {
        let nombre = prompt('Dinos tu nombre :-)');

        document.querySelector('.bienvenida').innerHTML="Hola " + nombre;

        localStorage.setItem('nombreUSuario', nombre);
    
    } else {
        let nombre = localStorage.getItem('nombreUsuario');
        document.querySelector('.bienvendia').innerHTML = 'Hola ' + nombre + '!'; 

    }

    console.log(localStorage);


    })