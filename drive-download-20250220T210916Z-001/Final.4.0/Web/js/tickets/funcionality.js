async function renderTickets(){
    const response = await fetch("http://localhost:3000/shoppingcart/getallbyuser", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: userId })
    });
    const responsejson = await response.json();
    //console.log(responsejson)
    const ticketsContainer = document.querySelector("#tickets > #ticketsflex");
    ticketsContainer.innerHTML = ``
    for(const ticket of responsejson){
        const dateStr = ticket.date;
        const date = new Date(ticket.date);
        const formattedDate = date.toLocaleString('es-EU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        
        console.log(formattedDate);

        const card = document.createElement("div")
        card.className = "ticket-card"
        card.innerHTML = `
        <div class="info">
            <p class="id">ID: ${ticket.id}</p>
            <p class="date">Opening Date: ${formattedDate}</p>
            <p class="opened">Opened: ${ticket.opened}</p>
            <p>Items: ${ticket.amountitems}</p>
            <p>Total Price: ${ticket.totalprice}</p>
        </div>
        <button class="button" onclick="showTicketItemsWindow(${ticket.id})">View Products</button>
        `
        ticketsContainer.appendChild(card)
    }

}
/*
async function renderTickets(){
    const response = await fetch("http://localhost:3000/shoppingcart/getallbyuser", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: 1 })
    });
    const responsejson = await response.json();
    //console.log(responsejson)
    const ticketsContainer = document.querySelector("#tickets > #ticketsflex");
    ticketsContainer.innerHTML = ``
    for(const ticket of responsejson){
        const card = document.createElement("div")
        card.className = "ticket-card"
        card.innerHTML = `
        <div class="info">
            <p class="id">ID: ${ticket.id}</p>
            <p class="date">Opening Date: ${ticket.date}</p>
            <p class="opened">Opened: ${ticket.opened}</p>
            <p>Items: ${ticket.amountitems}</p>
            <p>Total Price: ${ticket.totalprice}</p>
        </div>
        <button class="button" onclick="showTicketItemsWindow(${ticket.id})">View Products</button>
        `
        ticketsContainer.appendChild(card)
    }

}*/

async function renderTicketItems(ticket){
    const response = await fetch("http://localhost:3000/list", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shoppingcart: ticket })
    });

    const responsejson = await response.json();

    const ticketitemsflex = document.querySelector("#ticketitems > #ticketitemsflex")

    ticketitemsflex.innerHTML = ``

    for(const item of responsejson){

        console.log(item)

        const response = await fetch("http://localhost:3000/cartitem/getbycoffeeandshoppingcart", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coffee: item.id, shoppingcart: ticket})
        });

        const cartitem = await response.json()

        console.log(cartitem)

        const card = document.createElement("div")

        card.className = "ticketitem-card"

        card.innerHTML = `
        <div>
            <p>${item.name}</p>
            <p>Amount: ${cartitem[0].Amount}</p>
            <p>Price: ${item.price}</p>
            <p>Total Price:${item.price * cartitem[0].Amount}</p>
        </div>
        `

        ticketitemsflex.appendChild(card)
    }
}