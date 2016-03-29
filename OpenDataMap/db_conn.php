<?php


try
    {
		$con = new PDO("mysql:host=localhost;charset=utf8;port=8000;dbname=environment", 'root', '12345');
        $con->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  
	}
	catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage();
    }
    

?>
