<?php
class conexion{
	/**
	 * Constructor para conectarse a la base de datos local llamada estadistica
	 * @return $DBH retorna el objeto conexión para poder acceder a los datos de la BD
	 */
	function connBDestadistica(){
		/**
		 * $dbname="estadistica";
		 * $host="localhost";
		 * $user="postgres";
		 * $pass="otero1998";
		 */
		$dbname="dbmultisistemas";
		$host="multisistemas.com.co";
		$user="pgmultisistemas";
		$pass="M4lt1s1st3m@s";

		try {
			$DBH = new PDO("pgsql:dbname=$dbname;port=5432;host=$host;user=$user;password=$pass");
			//echo("<br>Conección a postgresql realizada exitosamente.<br>");
			return $DBH;
		}catch(PDOException $e){
			echo $e->getMessage();
			echo "Error al conectarse a la base de datos.";
		}
	}
}
?>