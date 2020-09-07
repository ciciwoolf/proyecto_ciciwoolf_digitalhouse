window.addEventListener('load',function(){
    //Capturar el formulario 
    let formulario = document.querySelector('.formulario');

    formulario.addEventListener('submit',function(evento){
        
        if(!validaciones(evento)){
            evento.preventDefault();
        }else{
            formulario.submit();
        }    

        function validaciones(evento){
        

            function validaciones(evento){
          
                let {first_name,last_name,email,password,confirm_password,avatar} = formulario.elements;
                let errores = []; //create empty array for error messages
                
                ulErrores.classList.add('alert-danger');   //Add button into registro.ejs
                //Validar el nombre
                if(first_name.value == ''){
                    errores.push('El campo nombre no puede estar vacio...');
                } else if (first_name.value.length < 3) {
                    errores.push("El campo de nombre debe tener al menos 3 caracteres")
                }
        
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
                //password
        
                let password = /^([a-zA-Z0-9@*#]{8,15})$/
                //Javascript posee un método que se encarga de validar nuestras expresiones regulares test
                if(!rePassword.test(password.value)){
                    errores.push('El password debe tener.....');
                    password.classList.add('is-invalid');
                    password.classList.remove('is-valid');
                }else{
                    password.classList.add('is-valid');
                    password.classList.remove('is-invalid');
                }
        
        
        
        
                //confirm_password
        
        
        
        
                //avatar
        
        
        
        
        
            ​
                //Aquí es cuando yo controlo si hay o no errores para enviar o no al usuario
                if(errores.length > 0){
                    ulErrores.innerHTML = '';
                    for(let i = 0; i < errores.length; i++){
                        ulErrores.innerHTML += `<li>${errores[i]}</li>`; //puts all the error messages into a list
                    }
                }else{
                    return true;
                }
            ​
            }