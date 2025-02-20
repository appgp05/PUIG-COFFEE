async function addToCart(coffee, shoppingcart){
    //alert(id);
    shoppingCartWindow.style.left = "60vw";
    try {
        const response2 = await fetch('http://localhost:3000/cartitem/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coffee: coffee, shopping_cart: shoppingcart, amount: 1 })
        });
        const data2 = await response2.json();
        fetchShoppingCartList(shoppingcart);
        //alert('Added movie to favourites:', data2);
    } catch (error) {
        console.error('Error adding movie to favourites:', error);
    }
}