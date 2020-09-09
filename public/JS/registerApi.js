window.addEventListener('load',function(){
   

    //test section

    let formulario = document.querySelector('.formulario');

    formulario.addEventListener('submit',function(evento){
        
        if(!validaciones(evento)){
            evento.preventDefault();
        }else{
            formulario.submit();
        }    

            function validaciones(evento){
          
                let {first_name,/*last_name,email,password,confirm_password,province, country, avatar*/} = formulario.elements;
                let errores = []; //create empty array for error messages
                
                ulErrores.classList.add('alert-danger');   //Add button into registro.ejs
                
                if(first_name.value == ''){
                    errores.push('El campo nombre no puede estar vacio...');
                } else if (first_name.value.length < 3) {
                    errores.push("El campo de nombre debe tener al menos 3 caracteres")
             
                }else{
                    first_name.classList.add('is-valid');
                    first_name.classList.remove('is-invalid');
                }
 
                //Aquí enviamos los errores al usuario
            let ulErrores = document.getElementById('errores');
            ulErrores.classList.add('alert-danger')
            if(errores.length > 0){
                evento.preventDefault();
                ulErrores.innerHTML = "";
                for (let i = 0 ; i < errores.length; i++){
                    ulErrores.innerHTML += `<li> ${errores[i]} </li> `
                }
                errores = [];
            }else{
                return true;
            } 
          }

        })


    //APIS
    let selectProvincia = document.getElementById('province');
    
    //Debemos crear una función que cargue las provincias
    cargarProvincias();

    function cargarProvincias(){
        fetch('https://apis.datos.gob.ar/georef/api/provincias') 
        .then(function(respuesta){
            return respuesta.json();
        })
        .then(function(datosProvincias){
            //console.log(datosProvincias.provincias);
            //selectProvincia.innerHTML = `<option value= "" disabled selected > Seleccione una provincia </option> `
            for (const datoProvincia of datosProvincias.provincias) {
                let opcionProvincia = document.createElement('option');
                opcionProvincia.setAttribute('value',datoProvincia.id);
                opcionProvincia.innerHTML = datoProvincia.nombre;
                selectProvincia.appendChild(opcionProvincia);
            }

        })
    }

    let selectCountry = document.getElementById('country');
    loadCountries();
    
    function loadCountries(){
        console.log("Ingresa carga paises")
        fetch('https://restcountries.eu/rest/v2/all') 
        .then(function(response){
            return response.json();
        })
        .then(function(infoCountries){
            
            selectCountry.innerHTML = `<option value= "" disabled selected > Seleccione su pais de origen </option> `
            for (const infoCountry of infoCountries) {
                let optionCountry = document.createElement('option');
                optionCountry.setAttribute('value',infoCountry.name);
                optionCountry.setAttribute('style', "background-image:url(" + infoCountry.flag + ");background-repeat: no-repeat;background-size: 388px 388px;");
                optionCountry.innerHTML = infoCountry.name;
                selectCountry.appendChild(optionCountry);
            }

        })
    }

})