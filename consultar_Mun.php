<?php     
    $minicipio = $_POST['minicipio']; 
    
    //$numDatos = 3; 
       
    include "conexion.php";

	$conMdm6=new conexion();
    $DBH=$conMdm6->connBDestadistica();   
        
    $sql = "SELECT * FROM " .$minicipio; // sentenciaSQL
    //$sql = "SELECT * FROM db_balboa"; // sentenciaSQL
    $STH = $DBH->query($sql);
     
    $i=0;
    while($row = $STH->fetch()){        
        $arreglo[$i] = $row;
        $i++;
    }	         
    //print_r ($arreglo[0][0]);
    //print_r($arreglo);
    echo json_encode($arreglo);
    
?>