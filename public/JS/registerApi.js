window.addEventListener('load',function(){
   

    

    

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