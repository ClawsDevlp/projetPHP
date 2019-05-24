/*------------------------------
General
------------------------------*/
"use strict"; //Force to declare any variable used

const profile = document.getElementById("profile");

const form_profile = document.getElementById("form_profile");
const pseudo = document.getElementsByName("pseudo")[0];
const planete = document.getElementsByName("planete")[0];
const avatars = document.querySelector("#form_profile .avatar_choice");

const nb_ends = document.getElementById("nb_ends");
const nb_games = document.getElementById("nb_games");

const badgesArea = document.getElementById("badges");

const popup_bg = document.getElementById("popup_bg");
const validate_btn = document.getElementById("validate");
const cancel_btn = document.getElementById("cancel");

const slider = document.getElementById("slider");
const slider_message = document.getElementById("slider_message");

/*------------------------------
Popup general & slider functions
------------------------------*/
function pop(evt) {
    evt.preventDefault();
    popup_bg.classList.remove("hide");
}

function unpop(evt) {
    evt.preventDefault();
    popup_bg.classList.add("hide");
}

function slide(message, color) {
    slider.className = "";
    slider.classList.add(color);
    slider_message.innerHTML = message;
    window.requestAnimationFrame(function (time) {
        window.requestAnimationFrame(function (time) {
            slider.classList.add("slider_animation");
        });
    });
}

/*------------------------------
Initialisation
------------------------------*/
document.addEventListener("DOMContentLoaded", initialiser);

function initialiser(evt) {
    //Creation URL and queries
    let url = new URL("api/profile/add_badges.php", "http://localhost/projetPHP/");
    //AJAX query : have badges
    fetch(url, {
            method: "POST"
        })
        .then(response => {
            if (response.status != 200) {
                response.json().then(data => {
                    //Error
                    console.log(data.message);
                });
            }
        })
        //Network error
        .catch(error => {
            console.log(error)
        });

    //Creation URL and queries
    url = new URL("api/profile/have_profile.php", "http://localhost/projetPHP/");
    //AJAX query : have profile
    fetch(url)
        .then(response => {
            if (response.status == 200) {
                response.json().then(data => {
                    pseudo.value = data.player.pseudo;
                    planete.value = data.player.planete;
                    avatars.querySelector("input[value='"+ data.player.id_avatar+"']").checked = true;
                    
                    if (data.statistics) {
                        nb_ends.innerHTML = data.statistics.nb_ends;
                        nb_games.innerHTML = data.statistics.nb_games;
                    }
                    if (data.badges) {
                        for (let badge of data.badges) {
                            let img_badge = info_badges.querySelector("img[data-idBadge='" + badge["id_badge"] + "']");
                            if (img_badge) {
                                img_badge.src = badge["link"];
                                img_badge.title = badge["name_badge"] + " : " + badge["description_badge"];
                            } else {
                                let new_img_badge = document.createElement("img");
                                new_img_badge.dataset.idBadge = badge["id_badge"];
                                new_img_badge.src = badge["link"];
                                new_img_badge.alt = badge["name_badge"];
                                new_img_badge.title = badge["name_badge"] + " : " + badge["description_badge"];
                                badgesArea.appendChild(new_img_badge);
                            }
                        }
                    }
                    profile.classList.remove("hide");
                });
            } else {
                //Error
                response.json().then(data => {
                    console.log(data.message);
                });
            }
        })
        //Network error
        .catch(error => {
            console.log(error)
        });

    //Popup update profile
    form_profile.addEventListener("submit", pop);
    validate_btn.addEventListener("click", sendUpdateProfile);
    cancel_btn.addEventListener("click", unpop);
    
    if(document.getElementById("test").getBoundingClientRect().x + 200 > window.innerWidth){
        console.log("oui");
        document.getElementById("test2").style.left = "0%";
        document.getElementById("test2").style.right = "50%";
    }
    
     console.log(document.getElementById("test").getBoundingClientRect());
    console.log(window.innerWidth);
}

/*------------------------------
Update the profile
------------------------------*/
//Send update profile
function sendUpdateProfile(evt) {
    evt.preventDefault();

    //Creation URL and queries
    let url = new URL("api/profile/update_profile.php", "http://localhost/projetPHP/");
    let params = {};
    if (form_profile.pseudo.value) params["pseudo"] = form_profile.pseudo.value;
    if (form_profile.pwd.value) params["pwd"] = form_profile.pwd.value;
    params["avatar"] = form_profile.avatar.value;
    if (form_profile.planete.value) params["planete"] = form_profile.planete.value;
    if (popup.mdp.value) params["currentPwd"] = popup.mdp.value;
    //AJAX query : registration
    fetch(url, {
            method: "PUT",
            body: JSON.stringify(params)
        })
        .then(response => {
            if (response.status == 200) {
                response.json().then(data => {
                    popup.reset();
                    unpop(evt);
                    slide("Votre profil a bien été mis à jour.", "slider_green");
                });
            } else if (response.status == 401){
                response.json().then(data => {
                    slide("Mot de passe incorrect.", "slider_red");
                });
            } else if (response.status == 409){
                response.json().then(data => {
                    popup.reset();
                    unpop(evt);
                    slide("Ce pseudo existe déjà dans l'univers.", "slider_red");
                });
            } else {
                //Other errors
                response.json().then(data => {
                    console.log(data.message);
                });
            }
        })
        //Network error
        .catch(error => {
            console.log(error)
        });
}