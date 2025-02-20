async function login(){
    //alert("a")
    const name = document.querySelector("#loginwindow #loginflex #credentials .name").value;
    const password = document.querySelector("#loginwindow #loginflex #credentials .password").value;
    const address = document.querySelector("#loginwindow #loginflex #credentials .address").value;

    const response = await fetch('http://localhost:3000/user/getbyname', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
    });

    const respons = await response.json();
    try{
    console.log(respons[0].id)
    if(password !== respons[0].password){
        //alert("Incorrect password")
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Incorrect password!',
            customClass: {
              popup: 'sweet-alert-custom',
              icon: 'sweet-alert-icon-custom',
              confirmButton: 'sweet-alert-btn-custom'
            }
          });
    } else {
        if(address !== respons[0].address){
            //alert("Incorrect address")
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Incorrect address!',
                customClass: {
                  popup: 'sweet-alert-custom',
                  icon: 'sweet-alert-icon-custom',
                  confirmButton: 'sweet-alert-btn-custom'
                }
              });
    
        } else {
            
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Login successful!',
                customClass: {
                  popup: 'sweet-alert-custom',
                  icon: 'sweet-alert-icon-custom',
                  confirmButton: 'sweet-alert-btn-custom'
                }
              }).then((result) => {
                if (result.isConfirmed) {
                  const buttonCart = document.querySelector("#buttonShoppingCart");
                  // Resto del código para actualizar elementos en la interfaz
                  loginCredentialUpdater(name)
                  loginButtonUpdater()
                }});
            
        }
    }
    } catch (error) {
        alert("Incorrect name")
    }
    

    //alert(name + " " + password + " " + address)
}

async function loginCredentialUpdater(name){
    setUserProperties(name)

    //alert("Inicio de sesión correcto")
}

function loginButtonUpdater(){
    try{
        const intranetButton = document.getElementById("intranetButton");

        if(userRol == 1){
            intranetButton.style.display = "initial"
        } else {
            intranetButton.style.display = "none"
            if(window.location.pathname !== '/index.html' && window.location.pathname !== '/'){
                window.location.href = '../index.html'
            }
            //console.log(window.location.pathname)
        }

        const buttonCart = document.querySelector("#buttonShoppingCart");
        buttonCart.outerHTML = '<a class="btn" onclick="showShoppingCart(' + userShoppingCart + ')" id="buttonShoppingCart" id="' + userShoppingCart + '"><button><p>Cart<p></button></a>'
        

        /*
        const response = await fetch('http://localhost:3000/shoppingcart/getid', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: respons[0].id })
        });
        

        const idShoppingcart = await response.json()
        alert(idShoppingcart[0].id)*/
        //buttonCart.outerHTML = '<a href="#" onclick="showShoppingCart(' + idShoppingcart[0].id + ')" class="buttonShoppingCart" id="' + idShoppingcart[0].id + '">ShoppingCart</a>'
        const cards = document.querySelectorAll(".coffee-card .buy-btn");
        //console.log(cards)
        cards.forEach((card) => {
            //console.log(card.id, userShoppingCart)
            // Update the onclick attribute of each card
            card.setAttribute("onclick", 'addToCart(' + card.id + ', ' + userShoppingCart + ')');
        });
        
        loginWindow.style.display = "none";


        //const buttonCart = document.querySelector("#buttonShoppingCart");

        //buttonCart.outerHTML = '<a href="#" onclick="showShoppingCart(' + userShoppingCart + ')" class="buttonShoppingCart" id="' + userShoppingCart + '">ShoppingCart</a>'
        //const cards = document.querySelectorAll(".coffee-card .buy-btn")
        /*cards.forEach((card) => {
            // Update the onclick attribute of each card
            card.setAttribute("onclick", 'addToCart(' + card.id + ', ' + userShoppingCart + ')');
        });*/
    } catch (error){
        console.log("Error trying to update the buttons on login", error)
    }
}

function logout(){
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userAddress");
    localStorage.removeItem("userShoppingCart")
    localStorage.removeItem("userRol");

    userId = localStorage.getItem("userId");
    userName = localStorage.getItem("userName");
    userAddress = localStorage.getItem("userAddress");
    userShoppingCart = localStorage.getItem("userShoppingCart");
    userRol = localStorage.getItem("userRol");

    selectLoginWindow()
    showLoginWindow()
}