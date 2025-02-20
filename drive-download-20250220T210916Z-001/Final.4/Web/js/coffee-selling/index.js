//let categories = [];
//let coffees = [];

const ShowCart = document.getElementById("shoppingcart");

document.addEventListener('DOMContentLoaded', () => {
    ShowCart.style.left = "100vw";

    //fetchCategories();
    fetchCoffees();
});

async function fetchCoffees(category){
    if(category === undefined){

      const a = await fetch('http://localhost:3000/coffee/getall')
    
      const b = await a.json()
      
      renderCoffees(b)
    } else {
      const a = await fetch('http://localhost:3000/coffee/getbycategory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: category })
        });
    
      const b = await a.json()
      
      renderCoffees(b)
    }

}

async function renderCoffees(filteredCoffees) {
  const coffeeContainer = document.querySelector('#coffee-flex');
  coffeeContainer.innerHTML = '';
  let cards = ``

  for (const coffee of filteredCoffees) {
    /*const card = document.createElement('div');
    card.className = 'coffee-card';

    card.innerHTML = `
      <div class="img-container">
        <img src="${coffee.image}" alt="Coffee Image">
      </div>
      <p class="name">${coffee.name}</p>
      <p class="description">${coffee.description}</p>
      <button class="buy-btn" id="${coffee.id}" onclick="addToCart(${coffee.id}, ${userShoppingCart})">Buy Now</button>
      <p class="price">${coffee.price}$</p>
    `;

    // Agrega un evento de clic a la imagen para mostrar detalles
    const imgContainer = card.querySelector('.img-container');
    imgContainer.addEventListener('click', () => {
      showCoffeeDetails(coffee);
    });

    coffeeContainer.appendChild(card);*/

    //const card = document.createElement('div');
    //card.className = 'coffee-card';

    cards = cards + `
      <div class="coffee-card">
      <div class="img-container">
        <img src="${coffee.image}" alt="Coffee Image">
      </div>
      <p class="name">${coffee.name}</p>
      <p class="description">${coffee.description}</p>
      <button class="buy-btn" id="${coffee.id}" onclick="addToCart(${coffee.id}, ${userShoppingCart})">Buy Now</button>
      <p class="price">${coffee.price}$</p>
      </div>
    `;

    // Agrega un evento de clic a la imagen para mostrar detalles
    /*const imgContainer = card.querySelector('.img-container');
    imgContainer.addEventListener('click', () => {
      showCoffeeDetails(coffee);
    });*/

    //coffeeContainer.appendChild(card);
  }
  coffeeContainer.innerHTML = cards;
  //loginButtonUpdater()
}


