//const loginWindow = document.getElementById("loginwindow");
//const registerWindow = document.getElementById("registerwindow");

document.addEventListener("DOMContentLoaded", ()=>{
    //loginWindow.style.display= "none";
    //console.log("llego")
    registerWindow.style.display= "none";
})

function showRegisterWindow(){
    loginWindow.style.display= "none";
    registerWindow.style.display= "initial";
}

function backRegister(){
    //alert("c")
    registerWindow.style.display = "none";
    loginWindow.style.display = "initial";
}

function closeRegister(){
    //alert("d")
    registerWindow.style.display = "none";
}