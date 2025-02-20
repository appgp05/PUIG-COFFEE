async function sumButton(id){
    try {
        const buttonShoppingCart = document.querySelector(".buttonShoppingCart")

        const response = await fetch('http://localhost:3000/cartitem/increaseamount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, shoppingcart: userShoppingCart })
        });

        //const data = await response.json();
        fetchShoppingCartList(userShoppingCart);
        //alert('Added movie to favourites:', data2);
    } catch (error) {
        console.error('Error trying to increase the amount of the cartitem: ', error);
}
}
  
async function restButton(id){
    try {
      const buttonShoppingCart = document.querySelector(".buttonShoppingCart")

      const response = await fetch('http://localhost:3000/cartitem/decreaseamount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, shoppingcart: userShoppingCart })
      });

      //const data = await response.json(buttonShoppingCart.id);
      fetchShoppingCartList(userShoppingCart);
      //alert('Added movie to favourites:', data2);
  } catch (error) {
      console.error('Error trying to decrease the amount of the cartitem:', error);
  }
  }

async function updateAmount(coffee, amount){
    const buttonShoppingCart = document.querySelector(".buttonShoppingCart")

    try{
        const response = await fetch("http://localhost:3000/cartitem/update", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coffee: coffee, shoppingcart: userShoppingCart, amount: amount })
        });

        //const data = await response.json();
        fetchShoppingCartList(userShoppingCart);
    } catch (error) {
        console.error('Error trying to update the amount of the cartitem:', error);
    }
}

async function closeShoppingCart(totalprice, amountitems){
    const responses = await fetch("http://localhost:3000/shoppingcart/setpriceandamount", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shoppingcart: userShoppingCart, totalprice: totalprice, amountitems: amountitems })
    });

    const response = await fetch("http://localhost:3000/shoppingcart/close", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shoppingcart: userShoppingCart })
    });

    const responss = await fetch('http://localhost:3000/shoppingcart/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: userId })
    })

    await setUserProperties(userName)

    fetchShoppingCartList(userShoppingCart)
}
