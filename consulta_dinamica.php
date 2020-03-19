<?php
     include "conexion.php";

     $conMdm6=new conexion();
     $DBH=$conMdm6->connBDestadistica();    
     require_once ('hora.php');
     $manag_hr = new hora(); 
     $sql = "SELECT  hora, dia,dat_id FROM estaunica ORDER BY dat_id DESC limit 1 "; // sentenciaSQL
     $STH = $DBH->query($sql);
     
     $i=0;
     while($row = $STH->fetch()){        
         $hrsqlac[$i] = $row[0];     //hui, día y la hora
         $diasqlac[$i] = $row[1];
         $dataId[$i] = $row[2];
         $i++;
     }	    	
     /*
     $hrvectul = $manag_hr -> hrvect($horaultima);                

     date_default_timezone_set('Asia/Bangkok');
     $mydate=getdate(date("U"));     
     if($horaultima != $hrsqlac[0]){
         $conf = 1;
     }else{
         $conf = 0;
     }          
     
    $hrvectul = $manag_hr -> hrvect($hrsqlac[0]);
    $hrvectul = $hrvectul[0]*100 + $hrvectul[1];*/
     echo $dataId[0];
?>