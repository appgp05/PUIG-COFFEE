document.addEventListener("DOMContentLoaded", ()=>{
    ticketsWindow.style.display = "none";
    ticketItemsWindow.style.display = "none";
})

function showTicketsWindow(){
    if(ticketsWindow.style.display == "none"){
        ticketsWindow.style.display= "initial";
        renderTickets();
    } else {
        ticketsWindow.style.display= "none";
    }
}

function showTicketItemsWindow(ticket){
    if(ticketItemsWindow.style.display == "none"){
        ticketItemsWindow.style.display= "initial";
        renderTicketItems(ticket);
    } else {
        ticketItemsWindow.style.display= "none";
    }
}

function closeTickets(){
    //alert("b")
    ticketsWindow.style.display = "none";
}

function closeTicketItems(){
    //alert("b")
    ticketItemsWindow.style.display = "none";
}