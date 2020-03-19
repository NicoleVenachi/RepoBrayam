<?php     
    $numDatos = $_POST['numDatos']; 
    $variable = $_POST['variable']; 
    //$numDatos = 3; 
       
    include "conexion.php";

	$conMdm6=new conexion();
    $DBH=$conMdm6->connBDestadistica();   
        
    $sql = "SELECT  hora, dia,".$variable.",dat_id FROM estaunica ORDER BY dat_id DESC limit ".$numDatos; // sentenciaSQL
    $STH = $DBH->query($sql);
     
    $i=0;
    while($row = $STH->fetch()){        
        $arreglo[$i] = $row;
        $i++;
    }	         
    
    echo json_encode($arreglo);
    
?>