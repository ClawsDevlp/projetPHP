<?php
    session_start();
    include_once "./data/MyPDO.projet-php-dictature.include.php";
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Interactive Space Story</title>
	</head>

	<body>
		<h1>BIENVENUE SUR NOTRE SITE</h1>
		<div id="screen">
				<div id="main-text"></div>
				<button class="button" id="button-1" type="button"></button>
				<button class="button" id="button-2" type="button"></button>
				<button class="button" id="button-3" type="button"></button>
		</div>
	</body>

	<script src="./js/partie_form.js"></script>
</html>