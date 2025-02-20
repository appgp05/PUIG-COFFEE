
var userId;
var userName;
var userAddress
var userShoppingCart;
var userRol;

//var sessionJoined = false;

document.addEventListener("DOMContentLoaded", () => {
    /*
    userId = localStorage.getItem("userId");
    userName = localStorage.getItem("userName");
    userAddress = localStorage.getItem("userAddress");
    userShoppingCart = localStorage.getItem("userShoppingCart");
    userRol = localStorage.getItem("userRol");

    console.log(userId + " " + userName + " " + userAddress + " " + userShoppingCart + " " + userRol)
    //console.log(userId)*/
    getUserProperties()
    //loginButtonUpdater()
});

function getUserProperties(){
    //alert("prueba")
    userId = localStorage.getItem("userId");
    userName = localStorage.getItem("userName");
    userAddress = localStorage.getItem("userAddress");
    userShoppingCart = localStorage.getItem("userShoppingCart");
    userRol = localStorage.getItem("userRol");

    console.log("----SESION----\nID: " + userId + "\nName: " + userName + "\nAddress: " + userAddress + "\nShoppingCart: " + userShoppingCart + "\nRol: " + userRol)


    loginButtonUpdater()
    /*

    const buttonCart = document.querySelector("#buttonShoppingCart");

    buttonCart.outerHTML = '<a href="#" onclick="showShoppingCart(' + userShoppingCart + ')" class="buttonShoppingCart" id="' + userShoppingCart + '">ShoppingCart</a>'
    const cards = document.querySelectorAll(".coffee-card .buy-btn")
    cards.forEach((card) => {
        // Update the onclick attribute of each card
        card.setAttribute("onclick", 'addToCart(' + card.id + ', ' + userShoppingCart + ')');
    });*/
};

async function setUserProperties(name){
    //console.log("llego")

    const response = await fetch('http://localhost:3000/user/getbyname', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
    });

    const responseList = await response.json();

    const user = responseList[0]

    //console.log("llego2")

    const response2 = await fetch('http://localhost:3000/shoppingcart/getid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: user.id })
    });

    const response2List = await response2.json();

    const shoppingcart = response2List[0]

    //console.log("llego3")

    //console.log(shoppingcart[0])

    localStorage.setItem("userId", user.id);
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userAddress", user.address);
    localStorage.setItem("userShoppingCart", shoppingcart.id)
    localStorage.setItem("userRol", user.rol);

    getUserProperties()
}