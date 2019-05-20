/*------------------------------
General
------------------------------*/
"use strict"; //Force to declare any variable used

const connection = document.getElementById("menu_connection");
const form_connection = document.getElementById("form_connection");
const go_registration = document.getElementById("go_registration");

const registration = document.getElementById("menu_registration");
const form_registration = document.getElementById("form_registration");

const back = document.getElementById("back");

const slider = document.getElementById("slider");
const slider_message = document.getElementById("slider_message");

const popup = document.getElementById("popup"); 
const popup_bg = document.getElementById("popup_bg");
const return_btn = document.getElementById("return");

const cgu = document.getElementById("cgu_link");

/*------------------------------
Initialisation
------------------------------*/
document.addEventListener("DOMContentLoaded", initialiser);

function initialiser(evt) {
    if (typeof connection !== "undefined" && connection !== null) {
        form_connection.addEventListener("submit", sendConnection);
        go_registration.addEventListener("click", goRegistration);
    }
}

/*------------------------------
Slider & popup functions
------------------------------*/
let isAnimated = false;
function wrongLoginSlider() {
    slider.style.backgroundColor = "#8B0000";
    isAnimated = true;
    slider_message.innerHTML = "Login(s) incorrect(s). Réessayez.";
    slider.classList.add("slider_animation");
    
    window.setTimeout(function() {
        slider.classList.remove("slider_animation");
        isAnimated = false;
        slider.style.backgroundColor = "#008000";
    }, 5000)
}

function accountCreatedSlider() {
    slider.style.backgroundColor = "#008000";
    isAnimated = true;
    slider_message.innerHTML = "Vous avez été retenu pour la mission. Embarquez dans votre navette !";
    slider.classList.add("slider_animation");

    window.setTimeout(function() {
        slider.classList.remove("slider_animation");
        isAnimated = false;
    }, 5000)
}

function errorAccountCreationSlider(message) {
    slider.style.backgroundColor = "#8B0000";
    isAnimated = true;
    slider_message.innerHTML = "Ce pseudo existe déjà dans l'univers.";
    slider.classList.add("slider_animation");

    window.setTimeout(function() {
        slider.classList.remove("slider_animation");
        isAnimated = false;
    }, 5000)
}

function pop(evt) {
    evt.preventDefault();
    popup.style.display="flex";
    popup_bg.style.display="flex";
    popup.classList.add("popup_animation");
}

function unpop(evt) {
    evt.preventDefault();
    popup.classList.remove("popup_animation");
    popup.style.display="none";
    popup_bg.style.display="none";
}

/*------------------------------
Menu connection
------------------------------*/
//Send connection
function sendConnection(evt) {
    evt.preventDefault();

    //Creation URL and queries
    let params = {};
    if (form_connection.pseudo.value) params["pseudo"] = form_connection.pseudo.value;
    if (form_connection.pwd.value) params["pwd"] = form_connection.pwd.value;

    let url = new URL("api/identification/connection.php", "http://localhost/projetPHP/");
    url.search = new URLSearchParams(params);

    //AJAX query : connection
    fetch(url)
        .then(response => {
            if (response.status == 200) {
                response.json().then(data => {
                    window.location.href = "home.php";
                });
            } else {
                //Error
                response.json().then(data => {
                    console.log(data.message);
                    if(!isAnimated) {
                        wrongLoginSlider();
                    }
                });
            }
        })
        //Network error
        .catch(error => {
            console.log(error)
        });
}

/*------------------------------
Menu registration
------------------------------*/
//Go to menu registration
function goRegistration(evt) {
    connection.classList.toggle("hide");
    registration.classList.toggle("hide");
    back.classList.toggle("hide");

    form_registration.addEventListener("submit", sendRegistration);
}

//Send registration
function sendRegistration(evt) {
    evt.preventDefault();

    //Creation URL and queries
    let url = new URL("api/identification/registration.php", "http://localhost/projetPHP/");

    let params = {};
    if (form_registration.pseudo.value) params["pseudo"] = form_registration.pseudo.value;
    if (form_registration.pwd.value) params["pwd"] = form_registration.pwd.value;
    if (form_registration.planete.value) params["planete"] = form_registration.planete.value;
    params["id_avatar"] = form_registration.avatar.value;

    //AJAX query : registration
    fetch(url, {
            method: "POST",
            body: JSON.stringify(params)
        })
        .then(response => {
            if (response.status == 200) {
                response.json().then(data => {
                    form_registration.reset();
                    connection.classList.toggle("hide");
                    registration.classList.toggle("hide");
                    if(!isAnimated) {
                        accountCreatedSlider();
                    }
                });
            } else {
                //Error
                response.json().then(data => {
                    console.log(data.message);
                    if(!isAnimated) {
                        errorAccountCreationSlider(data.message);
                    }
                });
            }
        })
        //Network error
        .catch(error => {
            console.log(error)
        });
}

cgu.addEventListener("click", pop);
return_btn.addEventListener("click", unpop);