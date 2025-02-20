async function register(){
    const name = document.querySelector("#registerwindow #registerflex #credentials .name").value;
    
    const password = document.querySelector("#registerwindow #registerflex #credentials .password").value;

    const address = document.querySelector("#registerwindow #registerflex #credentials .address").value;
    /*const type = document.querySelector("#registerwindow #registerflex #credentials .type").value;
    
    const response = await fetch('http://localhost:3000/rol/getid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: type })
    });
    
    const typeNumber = await response.json()
    
    const code = document.querySelector("#registerwindow #registerflex #credentials .code").value;*/
    
    if(name.length > 4){
        if(password.length > 5){
            if(address.includes("@") && address.includes(".com") && address.indexOf("@") < address.indexOf(".") && address.indexOf("@") > 0 && address.indexOf(".") >= address.indexOf("@") + 2){
               /* if(typeNumber[0].id == 1 && code !== "12345"){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'The code for the employeers its wrong',
                        customClass: {
                          popup: 'sweet-alert-custom',
                          icon: 'sweet-alert-icon-custom',
                          confirmButton: 'sweet-alert-btn-custom'
                        }
                      });
                    return;
                }*/
                        const response = await fetch('http://localhost:3000/user/getbyname', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: name })
                        });
                        
                        const responsss = await response.json();

                        if(responsss.length !== 0){
                            console.log("The account already exists", responsss)
                            
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'The account already exists',
                                customClass: {
                                  popup: 'sweet-alert-custom',
                                  icon: 'sweet-alert-icon-custom',
                                  confirmButton: 'sweet-alert-btn-custom'
                                }
                              });
                        } else {
                            console.log("Cuenta no existe", responsss)

                            Swal.fire({
                                icon: 'success',
                                title: 'Success!',
                                text: 'Register successful!',
                                customClass: {
                                  popup: 'sweet-alert-custom',
                                  icon: 'sweet-alert-icon-custom',
                                  confirmButton: 'sweet-alert-btn-custom'
                                }
                            }).then((result) => {
                            if (result.isConfirmed) {
                                //const buttonCart = document.querySelector("#buttonShoppingCart");
                                // Resto del código para actualizar elementos en la interfaz
        
                                //alert("Cuenta registrada");
                                
                            }});
                            try{
                            const respons = await fetch('http://localhost:3000/user/add', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ name: name, address: address, password: password, rol: /*typeNumber[0].id*/2 })
                                });
                                    //alert(typeNumber[0].id)
        
                                


                                try{
                                    const responsee = await fetch('http://localhost:3000/user/getbyname', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ name: name })
                                });
                                
        
                                const responssss = await responsee.json();

                                console.log("responssss", responssss)
                                const responss = await fetch('http://localhost:3000/shoppingcart/set', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ user: responssss[0].id})
                                })

                                    const acd = await responss.json();

                                    console.log("acd", acd)

                                    alert("Congratulations, you have registered an account with the following parameters:\n" + name + " " + address + " ****** " + type)
        
                                console.log(name)
        
                                setUserProperties(name)
        
                                closeRegister()
                                }catch(errorr){
                                    console.log("error", errorr)
                                }

                                
                            }catch(errorer){
                                console.log("porfa", errorer)
                            }
                        }
                    
                } else {
                //alert("The addres must have an @")
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'The address must have the following structure:\n(Something)@(Something).com!',
                    customClass: {
                      popup: 'sweet-alert-custom',
                      icon: 'sweet-alert-icon-custom',
                      confirmButton: 'sweet-alert-btn-custom'
                    }
                  });
            }
        } else {
            //alert("The password must be long");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The password must be longer!',
                customClass: {
                  popup: 'sweet-alert-custom',
                  icon: 'sweet-alert-icon-custom',
                  confirmButton: 'sweet-alert-btn-custom'
                }
              });
        }
    } else {
        //alert("The name must be longer");
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The name must be longer!',
            customClass: {
              popup: 'sweet-alert-custom',
              icon: 'sweet-alert-icon-custom',
              confirmButton: 'sweet-alert-btn-custom'
            }
          });
    }
}