//const { render } = require("node-less");

document.addEventListener("DOMContentLoaded", ()=>{
    //alert('a');
    //fetchShoppingCartList();
    try{
      shoppingCartWindow.style.left = "100vw";
    } catch (error){
      console.log("Error trying to load shoppingcart window", error)
    }
})

function showShoppingCart(shoppingcart){
  //alert(shoppingcart)
  if(ShowCart.style.left == "100vw"){
  ShowCart.style.left = "60vw";
  fetchShoppingCartList(shoppingcart);
  } else {
    ShowCart.style.left = "100vw";
  }
}

async function fetchShoppingCartList(shoppingcart){
    const response = await fetch('http://localhost:3000/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shoppingcart: shoppingcart })
    })
    
    const responsejson = await response.json()

    //console.log(responsejson)
    renderItems(responsejson)
}

async function renderItems(items) {
  const shoppingCartContainer = document.querySelector('#cartflex');
  
  /*shoppingCartContainer.innerHTML = `
  <div id="cartguide">
    <div id="cartguidename">Coffee</div> 
    <div id="cartguideamount">Amount</div>
    <div id="cartguideindprice">Ind Price</div>
    <div id="cartguidetotprice">Tot price</div>
  </div>
  `;*/

  //shoppingCartContainer.innerHTML = ``

  var amounttotalprice = 0
  var amountitems = 0

  let cards = ``

  for (const item of items) {
    try {
      //console.log(item)

      /*
      const response = await fetch(`http://localhost:3000/cartitem/getbycoffeeandshoppingcart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coffee: item.id, shoppingcart: userShoppingCart })
      });
      
      const cartitem = await response.json();
      
      //console.log(cartitem[0].Amount)
      //console.log(cartitem);

      const card = document.createElement('div');

      card.className = 'item-card';
      card.innerHTML = `
      <img class="img" src="${item.image}"></img>
      <div class="name">${item.name}</div>
      <button class="button" onclick="sumButton(${item.id})">+</button>
      <input type="text" class="button" value="${cartitem[0].Amount}" onblur="updateAmount(${item.id}, value)">
      <button class="button" onclick="restButton(${item.id})"> - </button>
      <div class="itemprice">${item.price}$</div>
      <div class="totalprice">${item.price * cartitem[0].Amount}$</div>
      `;
      
      amounttotalprice = amounttotalprice + (item.price * cartitem[0].Amount)
      amountitems = parseInt(amountitems) + parseInt(cartitem[0].Amount)

      shoppingCartContainer.appendChild(card);
      console.log("Amount", amountitems, " Total Price", amounttotalprice)*/

      const response = await fetch(`http://localhost:3000/cartitem/getbycoffeeandshoppingcart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coffee: item.id, shoppingcart: userShoppingCart })
      });
      
      const cartitem = await response.json();
      
      //console.log(cartitem[0].Amount)
      //console.log(cartitem);

      //const card = document.createElement('div');

      //card.className = 'item-card';
      cards = cards + `
      <div class="item-card">
      <img class="img" src="${item.image}"></img>
      <div class="name">${item.name}</div>
      <button class="button" onclick="sumButton(${item.id})">+</button>
      <input type="text" class="button" value="${cartitem[0].Amount}" onblur="updateAmount(${item.id}, value)">
      <button class="button" onclick="restButton(${item.id})"> - </button>
      <div class="itemprice">${item.price}$</div>
      <div class="totalprice">${item.price * cartitem[0].Amount}$</div>
      </div>
      `;
      
      amounttotalprice = amounttotalprice + (item.price * cartitem[0].Amount)
      amountitems = parseInt(amountitems) + parseInt(cartitem[0].Amount)

      //shoppingCartContainer.appendChild(card);
      console.log("Amount", amountitems, " Total Price", amounttotalprice)
    } catch (error) {
      console.log("Error trying to render the items of the shoppingcart. Error: ", error)
    }
  }

  amounttotalprice = parseFloat(amounttotalprice.toFixed(2));

  shoppingCartContainer.innerHTML = ``
  shoppingCartContainer.innerHTML = cards

  //alert("llego")
  const totalprice = document.querySelector("#buycart > p")

  //alert("llego")

  totalprice.innerHTML = `Total price: ${amounttotalprice}$`

  const buttonCloseShoppingCart = document.querySelector("#shoppingcart > #buycart > #buttonCloseShoppingCart")
  buttonCloseShoppingCart.setAttribute("onclick", "closeShoppingCart(" + amounttotalprice + ", " + amountitems + ")")
  //alert("llego")
  //cartguideposition()
}

/*
<div id="shoppingcart">
  <div id="cartflex">
      <div class="item-card">
        <div class="img"></div>
        <div class="name">Ejemplo</div>
        <button class="button"> - </button>
        <input type="text" class="button" value="0">
        <button class="button"> + </button>
      </div>
  </div>
  <div id="buycart">
    <p>Total price:</p>
    <button onclick="closeShoppingCart()">Buy</button>
    <button onclick="showTicketsWindow()">Tickets</button>
  </div>
</div>







function cartguideposition(){
  //const cartguidedivs = document.querySelectorAll("#shoppingcart > #cartflex > #cartguide > div")

  for(const cartguidediv of cartguidedivs){
    cartguidediv.style.left = "100px"
  }

  const cartguidename = document.querySelector("#shoppingcart > #cartflex > #cartguide > #cartguidename")
  const cartguideamount = document.querySelector("#shoppingcart > #cartflex > #cartguide > #cartguideamount")
  const cartguideindprice = document.querySelector("#shoppingcart > #cartflex > #cartguide > #cartguideindprice")
  const cartguidetotprice = document.querySelector("#shoppingcart > #cartflex > #cartguide > #cartguidetotprice")

  const namebox = document.querySelector("#shoppingcart > #cartflex > .item-card > .name")
  var rect = namebox.getBoundingClientRect()
  cartguidename.style.left = rect.left
}*/
/*
<div id="shoppingcart">
  <div id="cartflex">
      <div class="item-card">
        <div class="img"></div>
        <div class="name">Ejemplo</div>
        <button class="button"> - </button>
        <input type="text" class="button" value="0">
        <button class="button"> + </button>
      </div>
  </div>
  <div id="buycart">
    <p>Total price:</p>
    <button>Buy</button>
  </div>
</div>*/