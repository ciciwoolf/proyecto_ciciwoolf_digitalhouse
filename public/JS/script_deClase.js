/*window.addEventListener('load',function() {

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


window.addEventListener('load',function(){
    //Capturas de elementos
    let formulario = document.getElementById('formulario');
    let ulErrores = document.getElementById('errores');
    let selectProvincias =  document.querySelector('#provincias');
    ​
    //console.log(formulario.elements.first_name.value);
    formulario.addEventListener('submit',function(evento){
        if(!validaciones(evento)){
           return  evento.preventDefault();
        }
        return formulario.submit();
    })
    ​
    function validaciones(evento){
        //Asi se ralizaba antes de ECMA-6
        //let first_name = formulario.elements.first_name.value;
        //let last_name = formulario.elements.last_name.value;
        //let email = formulario.elements.email.value;
        //Destructuring de código
        let {first_name,last_name,email,password,confirm_password,avatar} = formulario.elements;
        let errores = [];
        ulErrores.classList.add('alert-danger');
        //Validar el nombre
        if(first_name.value == ''){
            errores.push('El campo nombre no puede estar vacio...');
            first_name.classList.add('is-invalid');
            first_name.classList.remove('is-valid');
        }else{
            first_name.classList.add('is-valid');
            first_name.classList.remove('is-invalid');
        }
    ​
        //Validar a apellidos
        if(last_name.value == ''){
            errores.push('El campo apellido no puede estar vacio...');
            last_name.classList.add('is-invalid');
            last_name.classList.remove('is-valid');
        }else{
            last_name.classList.add('is-valid');
            last_name.classList.remove('is-invalid');
        }
        
        //Validar el email  -  password (Expresiones Regulares)
        let reEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        //Javascript posee un método que se encarga de validar nuestras expresiones regulares test
        if(!reEmail.test(email.value)){
            errores.push('El email inválido...');
            email.classList.add('is-invalid');
            email.classList.remove('is-valid');
        }else{
            email.classList.add('is-valid');
            email.classList.remove('is-invalid');
        }
    ​
        //Ojo Faltan mas validaciones  - Tarea para el hogar
    ​
        //Aquí es cuando yo controlo si hay o no errores para enviar o no al usuario
        if(errores.length > 0){
            ulErrores.innerHTML = '';
            for(let i = 0; i < errores.length; i++){
                ulErrores.innerHTML += `<li>${errores[i]}</li>`;
            }
        }else{
            return true;
        }
    ​
    }
    ​
    //Aquí vamos a trabajar con el consumo de API 
    //Debemos llamar a la función
    cargarProvincias();
    ​
    function cargarProvincias(){
        fetch('https://apis.datos.gob.ar/georef/api/provincias')
        .then(function(respuesta){
            return respuesta.json()
        })
        .then(function(datosProvincias){
          onsole.log(datosProvincias.provincias);
           for (const opcionProvincia of datosProvincias.provincias) {
            let opcionesProvincias = document.createElement('option');
            opcionesProvincias.setAttribute('value',opcionProvincia.id);
            opcionesProvincias.innerHTML = opcionProvincia.nombre;
            selectProvincias.appendChild(opcionesProvincias);    
           }
           
        })
        .catch(error => console.error(error)) 
    }
    ​  ​
    ​
    })  */


    event.preventDefault();
    let errores = [];
    let campoNombre = document.querySelector ('input.nombre');
    if(campoNombre.value == "") {
        errores.push("El campo nombre esta vacio");
    }
    if (errores.length > 0) {
        event.preventDefault();
    }



