<?php
    session_start();
    include_once "api/data/MyPDO.projet_cosmos_2.include.php";
    if (!(isset($_SESSION["id"]))){ //Player is not connected
        header("Location: index.php");
    }
?>

<!DOCTYPE HTML>
<html lang="fr">

<head>
    <!--<link rel="shortcut icon" href="" />-->
    <title>Projet Cosmos · Jeu</title>

    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Projet Cosmos : fiction intéractive se déroulant dans l'espace" />
    <meta name="keywords" content="fiction, intéractive, interactive, aventure, adventure, textuel, textual, text, jeu, game, choix, choice, espace, space, amnésie, amnesia">

    <!-- CSS -->
    <link href="https://fonts.googleapis.com/css?family=VT323" rel="stylesheet">
    <link rel="stylesheet" href="css/normalize.css" type="text/css" />
    <link rel="stylesheet" href="css/style.css" type="text/css" />
</head>

<body>
    <main>
        <section id="profile">

            <div id="back_menu">
                <span>Menu</span>
                <a href="home.php">
                    <img src="http://placehold.it/50x50/ea0d0d/fff&text=Menu">
                </a>
            </div>

            <section id="infos_player">
                <h2>Mes informations</h2>
                <form id="form_profile">
                    <div>
                        <label for="pseudo">Pseudo</label>
                        <input type="text" name="pseudo">
                    </div>
                    <div>
                        <label for="mail">Email</label>
                        <input type="text" name="mail">
                    </div>
                    <div>
                        <label for="pwd">Mot de passe</label>
                        <input type="password" name="pwd">
                    </div>
                    <div class="avatar_choice">
                        <p>Avatar</p>
                        <label>
                            <input type="radio" name="avatar" value="avatar_1" checked>
                            <img src="http://placehold.it/50x50/0bf/fff&text=A">
                        </label>
                        <label>
                            <input type="radio" name="avatar" value="avatar_2">
                            <img src="http://placehold.it/50x50/b0f/fff&text=B">
                        </label>
                        <label>
                            <input type="radio" name="avatar" value="avatar_2">
                            <img src="http://placehold.it/50x50/6cf00/fff&text=C">
                        </label>
                        <label>
                            <input type="radio" name="avatar" value="avatar_2">
                            <img src="http://placehold.it/50x50/ffa700/fff&text=D">
                        </label>
                    </div>
                    <div>
                        <button type="submit" class="btn">Mettre à jour mes infos</button>
                    </div>
                </form>
            </section>

            <hr>

            <section id="infos_games">
                <h2>Mes réveils</h2>
                <p><span id="nb_ends"></span> fins sur 10</p>
                <p><span id="nb_games"></span> réveils</p>
            </section>

            <section id="info_badges">
                <h2>Mes badges</h2>
                <img data-idBadge="1" src="http://placehold.it/50x50/d3d3d3/fff&text=1" alt="Petit ange parti trop tôt" title="Petit ange parti trop tôt">
                <img data-idBadge="2" src="http://placehold.it/50x50/d3d3d3/fff&text=2" alt="Noir c'est noir" title="Noir c'est noir">
                <img data-idBadge="3" src="http://placehold.it/50x50/d3d3d3/fff&text=3" alt="La race avant tout" title="La race avant tout">
                <img data-idBadge="4" src="http://placehold.it/50x50/d3d3d3/fff&text=4" alt="440 Hz" title="440 Hz">
                <img data-idBadge="5" src="http://placehold.it/50x50/d3d3d3/fff&text=5" alt="Complètement marteau" title="Complètement marteau">
                <img data-idBadge="6" src="http://placehold.it/50x50/d3d3d3/fff&text=6" alt="Oh no." title="Oh no.">
                <img data-idBadge="7" src="http://placehold.it/50x50/d3d3d3/fff&text=7" alt="MacGyver" title="MacGyver">
                <img data-idBadge="8" src="http://placehold.it/50x50/d3d3d3/fff&text=8" alt="Tapez dans l'dos !" title="Tapez dans l'dos !">
                <img data-idBadge="9" src="http://placehold.it/50x50/d3d3d3/fff&text=9" alt="Bienvenue dans la grappe" title="Bienvenue dans la grappe">
                <img data-idBadge="10" src="http://placehold.it/50x50/d3d3d3/fff&text=10" alt="	Les Raisins de la colère" title="Les Raisins de la colère">
                <img data-idBadge="11" src="http://placehold.it/50x50/d3d3d3/fff&text=11" alt="Caaapitaine Flam" title="Caaapitaine Flam">
                <img data-idBadge="12" src="http://placehold.it/50x50/d3d3d3/fff&text=12" alt="Poussières d’étoiles" title="Poussières d’étoiles">
                <img data-idBadge="13" src="http://placehold.it/50x50/d3d3d3/fff&text=13" alt="Chorémanie" title="Chorémanie">
                <img data-idBadge="14" src="http://placehold.it/50x50/d3d3d3/fff&text=14" alt="Mon langage de requête structurée" title="Mon langage de requête structurée">
                <img data-idBadge="15" src="http://placehold.it/50x50/d3d3d3/fff&text=15" alt="Premier degré" title="Premier degré">
                <img data-idBadge="16" src="http://placehold.it/50x50/d3d3d3/fff&text=16" alt="Fintastique !" title="Fintastique !">
                <img data-idBadge="17" src="http://placehold.it/50x50/d3d3d3/fff&text=17" alt="C'EST LE BOUTON ROUGE" title="C'EST LE BOUTON ROUGE">
                <img data-idBadge="18" src="http://placehold.it/50x50/d3d3d3/fff&text=18" alt="Passion amnésie spatiale" title="Passion amnésie spatiale">
                <img data-idBadge="19" src="http://placehold.it/50x50/d3d3d3/fff&text=19" alt="J'adore ce que vous faîtes" title="J'adore ce que vous faîtes">
            </section>

        </section>
    </main>

    <!-- JavaScript -->
    <script src="js/profile.js"></script>
</body>

</html>