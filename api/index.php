<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$app = new \Slim\App;



function getConnection() {
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="root";
	$dbname="bookmark";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser);
	$dbh -> exec("set names utf8");
	$dbh -> exec("SET CHARSET utf8");
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	return $dbh;
}

//get User Bookmarks
$app->get('/bookmarks/{idUser}', function (Request $request, Response $response, $args) {
		$idUser = (int)$args['idUser'];
		$sql = "select * FROM bookmark where idUser=$idUser";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$bookmarks = $stmt->fetchAll(PDO::FETCH_OBJ);
		$response->getBody()->write(json_encode($bookmarks));
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
	return $response->withHeader('Access-Control-Allow-Origin', '*');
});

//get Bookmark
$app->get('/bookmark/{idBookmark}', function (Request $request, Response $response, $args) {
		$idBookmark = (int)$args['idBookmark'];
		$sql = "select * FROM bookmark where idBookmark=$idBookmark";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$bookmark = $stmt->fetch(PDO::FETCH_OBJ);
		$response->getBody()->write(json_encode($bookmark));
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
	return $response->withHeader('Access-Control-Allow-Origin', '*');
});

//add bookmark
$app->post('/bookmark/{idUser}', function (Request $request, Response $response, $args) {
	$idUser = (int)$args['idUser'];
    $data = $request->getParsedBody();
	$nom = filter_var($data['nom'], FILTER_SANITIZE_STRING);
	$url = filter_var($data['url'], FILTER_SANITIZE_STRING);
	$comment = filter_var($data['url'], FILTER_SANITIZE_STRING);
	$sql = "INSERT INTO bookmark (nom, url, comment, idUser) VALUES ('$nom', '$url', '$comment', '$idUser')";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
	return $response->withHeader('Access-Control-Allow-Origin', '*');
});

//delete bookmark
$app->delete('/bookmark/{idBookmark}', function (Request $request, Response $response, $args) {
	$idBookmark = (int)$args['idBookmark'];
	$sql = "DELETE FROM bookmark WHERE idBookmark=$idBookmark";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
	return $response->withHeader('Access-Control-Allow-Origin', '*');
});

//get User
$app->get('/user/{idUser}', function (Request $request, Response $response, $args) {
	$idUser = (int)$args['idUser'];
	$sql = "select * FROM user where idUser=$idUser";
try {
	$db = getConnection();
	$stmt = $db->query($sql);  
	$bookmarks = $stmt->fetch(PDO::FETCH_INT);
	$response->getBody()->write(json_encode($bookmarks));
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}
return $response->withHeader('Access-Control-Allow-Origin', '*');
});

//add user
$app->post('/user', function (Request $request, Response $response) {
	$data = $request->getParsedBody();
	$email = filter_var($data['email'], FILTER_SANITIZE_STRING);
	$sqlVerify = "select count(*) nbRows FROM user where email = '$email'";
	try {
		$db = getConnection();
		$stmt = $db->query($sqlVerify);
		$count = $stmt->fetch(PDO::FETCH_OBJ);
		if($count->nbRows > 0){
			echo '{"error":{"text":'.$email.' already exist}}'; 
			return $response->withHeader('Access-Control-Allow-Origin', '*')->withStatus(400);
		}
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}

	$pseudo = filter_var($data['pseudo'], FILTER_SANITIZE_STRING);
	$password = filter_var($data['password'], FILTER_SANITIZE_STRING);
	$sql = "INSERT INTO user (email, pseudo, password) VALUES ('$email', '$pseudo', '$password')";
	try {
		$db->query($sql);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
	return $response->withHeader('Access-Control-Allow-Origin', '*');
});






// lancement du Web Service
$app->run();
?>