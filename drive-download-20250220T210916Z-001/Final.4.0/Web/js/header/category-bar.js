document.addEventListener("DOMContentLoaded", async ()=> {
    try{
        const categoryBarFlex = document.querySelector("#categoryBar > #categoryBarFlex");

        categoryBarFlex.innerHTML = `<div onclick="fetchCoffees()">All</div>`

        const response = await fetch('http://localhost:3000/category/get')

        const responses = await response.json()

        for(const a of responses){
            //console.log(a)
            
            const card = document.createElement(`div`)
            
            card.innerHTML = `<div onclick="fetchCoffees(${a.id})">${a.name}</div>`

            categoryBarFlex.appendChild(card)
        }
    } catch (error) {
        console.log("Error trying to load categorybar", error)
    }
});

document.addEventListener("scroll", () => {
    /*
    const categoryBar = document.querySelector("#categoryBar");
    categoryBar.style.top = "calc(60px - 40px)";

    //console.log(window.scrollY)
    
    const coffeeZone = document.querySelector("#coffeeselling")
    //coffeeZone.style.display="none"

    if(window.scrollY > coffeeZone.offsetTop - 200){
       categoryBar.style.top = "60px" 
    }*/
});