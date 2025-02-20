document.addEventListener("DOMContentLoaded", ()=>{
    loginWindow.style.display = "none";
    //registerWindow.style.display= "none";
    //getUserProperties()
    //checkSession()
})

/*PEDIR ALBERTO EXPLICAR ESTO*/

function showLoginWindow(){
    if(loginWindow.style.display == "none"){
        selectLoginWindow()
        loginWindow.style.display= "initial";
    } else {
        loginWindow.style.display= "none";
    }
}

function backLogin(){
    //alert("a")
    loginWindow.style.display = "none";
}

function closeLogin(){
    //alert("b")
    loginWindow.style.display = "none";
}


/*
function checkSession(){
   //alert("a")
    //loginFlex.style.display = "none"
    getUserProperties()
    if(userId !== null && userName !== null && userAddress !== null && userRol !== null){
    //if(userId !== null){ 
        //console.log(userId)
        //console.log(typeof userId)
        alert("Open")
        loginFlex.innerHTML = `
        <p>Sesión iniciada con éxito</p>
        <div id="credentials">
            <p>Name: ` + userName + `</p>
            <p>Address: ` + userAddress+ `</p>
            <p>Rol: ` + userRol + `</p>
            <button onclick="logout()">LOGOUT SESSION</button>
        </div>
        `
    } else {
        alert("Close")
        loginFlex.innerHTML = `
        <p>LOGIN</p>
        <div id="credentials">
            <input type="text" placeholder="Name" class="name">
            <input type="password" placeholder="Password" class="password">
            <input type="text" placeholder="Address" class="address">
            <button onclick="login()">LOGIN</button>
            <p>Don't have an account? Register one. <a href="#" onclick="showRegisterWindow()">Click here</a></p>
                <datalist id="rol">
                    <option value="Employee"></option>
                    <option value="Client"></option>
                </datalist>
        </div>
        `
    }
}
*/


function selectLoginWindow(){
    getUserProperties()

    if(checkSession()){
        //alert("Open")
        loginFlex.innerHTML = `
        <p class=developer-successful-login>Login successful</p>
        <div class=credentials-css-div>
            <p class=credentials-name>Name: ` + userName + `</p>
            <p class=credentials-address>Address: ` + userAddress+ `</p>
            <p class=credentials-rol>Rol: ` + userRol + `</p>
            <button onclick="logout()" class="logout-button">LOGOUT SESSION</button>
            </div>
        </div>
        `
    } else {
        //alert("Close")

        //Remember me + forgot password
        /*
        <div id="credentials">
        <h1 class="login-title">Sign in to your account</h1> 
           <p>Your Name </p>
            <input type="text" placeholder="" class="name">
            <p>Password</p>
            <input type="password" placeholder="••••••••"class="password">
            <p>Your Address</p>
            <input type="text" placeholder="name@company.com" class="address">
            <div class="additional-options">
            <label><input type="checkbox" id="remember-me"> Remember Me</label>
            <a href="#" id="forgot-password" onclick="showForgotPassword()"><p class=forgot-password>Forgot Password?</p></a>
            </div>
            <button class="login-button" onclick="login()">Log in to your account</button>
            <p class="dont-have-account"><a id="click-here" onclick="showRegisterWindow()">Don't have an account?</a></p>
        </div>
        */

        loginFlex.innerHTML = `
        <div id="credentials">
        <h1 class="login-title">Sign in to your account</h1> 
           <p>Your Name </p>
            <input type="text" placeholder="" class="name">
            <p>Password</p>
            <input type="password" placeholder="••••••••"class="password">
            <p>Your Address</p>
            <input type="text" placeholder="name@company.com" class="address">
            <button class="login-button" onclick="login()">Log in to your account</button>
            <p class="dont-have-account"><a id="click-here" onclick="showRegisterWindow()">Don't have an account?</a></p>
        </div>
        `
    }
}

function checkSession(){
    if(userId !== null && userName !== null && userAddress !== null && userRol !== null){
        //alert("open")
        return true;
    } else {
        //alert("close")
        return false
    }
}
/*
function checkSession(){
   //alert("a")
    //loginFlex.style.display = "none"
    getUserProperties()
    if(userId !== null && userName !== null && userAddress !== null && userRol !== null){
    //if(userId !== null){ 
        //console.log(userId)
        //console.log(typeof userId)
        alert("Open")
        loginFlex.innerHTML = `
        <p>Sesión iniciada con éxito</p>
        <div id="credentials">
            <p>Name: ` + userName + `</p>
            <p>Address: ` + userAddress+ `</p>
            <p>Rol: ` + userRol + `</p>
            <button onclick="logout()">LOGOUT SESSION</button>
        </div>
        `
    } else {
        alert("Close")
        loginFlex.innerHTML = `
        <p>LOGIN</p>
        <div id="credentials">
            <input type="text" placeholder="Name" class="name">
            <input type="password" placeholder="Password" class="password">
            <input type="text" placeholder="Address" class="address">
            <button onclick="login()">LOGIN</button>
            <p>Don't have an account? Register one. <a href="#" onclick="showRegisterWindow()">Click here</a></p>
                <datalist id="rol">
                    <option value="Employee"></option>
                    <option value="Client"></option>
                </datalist>
        </div>
        `
    }
}
*/