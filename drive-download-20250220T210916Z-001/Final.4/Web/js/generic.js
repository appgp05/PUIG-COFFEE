const out = document.querySelector("body");

//const shoppingCartWindow = document.getElementById("shoppingcart")

const header = document.getElementById("header")

out.addEventListener("click", (event) => {

    //console.log(event.target.tagName)
    //console.log(event.target.className)

    if(!shoppingCartWindow.contains(event.target) && !header.contains(event.target)){
        //alert("a")
        shoppingCartWindow.style.left = "100vw"  
        
        //console.log(event.target.onclick)
    }

    //shoppingCartWindow.style.left = "100vw"

});