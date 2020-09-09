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
         
                console.log(formulario.elements)
                             
                console.log(evento)

                let {first_name,last_name,email,password,confirm_password, province, country, avatar} = formulario.elements;
                let errores = []; //create empty array for error messages

                         
                
                if(first_name.value == ''){
                    errores.push('El campo nombre no puede estar vacio...');
                } else if (first_name.value.length < 3) {
                    errores.push("El campo de nombre debe tener al menos 3 caracteres")
             
                }else{
                    first_name.classList.add('is-valid');
                    first_name.classList.remove('is-invalid');
                }                
                
                //Validar a apellidos
                if(last_name.value == ''){
                    errores.push('El campo apellido no puede estar vacio...');
                    last_name.classList.add('is-invalid');
                    
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
                    
                }else{
                    email.classList.add('is-valid');
                    email.classList.remove('is-invalid');
                }
            
            
                //password
                let rePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
                //Javascript posee un método que se encarga de validar nuestras expresiones regulares test
                if(!rePassword.test(password.value)){
                    errores.push('La contraseña como mínimo debe tener ocho caracteres, al menos una letra y un número');
                    password.classList.add('is-invalid');   
                 
                }else{
                    password.classList.add('is-valid');
                    password.classList.remove('is-invalid');
                }
        
                 
                //confirm_password

                if(confirm_password.value == ""){
                    errores.push('La confirmación de la contraseña no puede estar vacia');
                    confirm_password.classList.add('is-invalid');   
        
                }else{
                    
                    if(password.value != confirm_password.value && confirm_password != ""){
                        errores.push('Las contraseñas deben ser iguales');
                        confirm_password.classList.add('is-invalid');   
                      
                    }else{
                        confirm_password.classList.add('is-valid');
                        confirm_password.classList.remove('is-invalid');
                    }
                }
        
                //provincia
                    console.log(province.value)
                if(province.value == ""){
                    errores.push('Debes seleccionar una provincia');
                    province.classList.add('is-invalid');   
                  
                }else{
                    province.classList.add('is-valid');
                    province.classList.remove('is-invalid');
                }

                //pais

                if(country.value == ""){
                    errores.push('Debes seleccionar un pais de origen');
                    country.classList.add('is-invalid');   
                 
                }else{
                    country.classList.add('is-valid');
                    country.classList.remove('is-invalid');
                }


                //avatar
                if(avatar.value == ''){
                    errores.push('Debe seleccionar su avatar en formato JPG - PNG ó JPEG');
                    avatar.classList.add('is-invalid');   
                    //errores['last_name'] = 'El campo nombre no puede estar vacio...';
                }else{
                    avatar.classList.add('is-valid');
                    avatar.classList.remove('is-invalid');
                }
        

                      //Put error messages at the end of the function
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


    })