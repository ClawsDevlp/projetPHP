<?php
/*
 *  Register a player
 */

//Headers
header("Content-Type: application/json; charset=UTF-8");

//Check HTTP method
$method = strtolower($_SERVER["REQUEST_METHOD"]);
if($method !== "post") {
    http_response_code(405);
    echo json_encode(array("message" => "This method is not allowed."));
    exit();
}

//Check params
$data = json_decode(file_get_contents("php://input"), true);
if(!isset($data["pseudo"]) || empty($data["pseudo"])){
    http_response_code(422);
    echo json_encode(array("message" => "Missing pseudo."));
    exit();
}
if(!isset($data["pwd"]) || empty($data["pwd"])){
    http_response_code(422);
    echo json_encode(array("message" => "Missing password."));
    exit();
}
if(!isset($data["id_avatar"]) || empty($data["id_avatar"])){
    http_response_code(422);
    echo json_encode(array("message" => "Missing avatar."));
    exit();
}
$pseudo = $data["pseudo"];
$pwd = $data["pwd"];
$id_avatar = $data["id_avatar"];
$planete = (isset($data["planete"])) ? $data["planete"] : "Terre";

//Include data bdd
 include_once "../data/MyPDO.projet_cosmos.include.php";

//Check if single pseudo
$stmtCheckPseudo = MyPDO::getInstance()->prepare(<<<SQL
    SELECT * 
    FROM joueur 
    WHERE joueur.pseudo = :pseudo;
SQL
);
$stmtCheckPseudo->execute(array(":pseudo" => $pseudo));
if(($row = $stmtCheckPseudo->fetch()) !== false) {
    http_response_code(409);
    echo json_encode(array("message" => "Pseudo already exists."));
    exit();
}

//Insert player data into the player table
$stmtInsertPlayer = MyPDO::getInstance()->prepare(<<<SQL
    INSERT INTO joueur (pseudo, planete_origine, mdp, id_avatar) 
    VALUES (:pseudo, :planete, :pwd, :id_avatar);
SQL
);
$stmtInsertPlayer->execute(array(":pseudo" => $pseudo, ":planete" => $planete, ":pwd" => md5($pwd), ":id_avatar" => $id_avatar));

//Response
http_response_code(200);
echo json_encode(array("message" => "Done."));

exit();

?>