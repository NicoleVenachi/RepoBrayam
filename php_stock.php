<?php
	/**
	 * Nombre del archivo: index.php
	 */
    include "conexion.php";

	$conMdm6=new conexion();
    $DBH=$conMdm6->connBDestadistica();
    $sql = "SELECT hiuv, hora,dia,tempout,rain,dat_id FROM estaunica ORDER BY dat_id "; // sentenciaSQL
    //$sql = "SELECT hiuv, hora,dia,tempout,rain FROM estaunica ORDER BY dat_id ASC limit 60*24*5"; // sentenciaSQL
    $STH = $DBH->query($sql);   
    require_once ('hora.php');
    $manag_hr = new hora(); 
         
    $i=0;
	while($row = $STH->fetch()){        
       $huiv[$i] = $row[0];     //Saca lasvariables dela bd
       $hora[$i] = $row[1];     //hui, día y la hora
       $dia[$i] = $row[2];
       $temp[$i] = $row[3];
       $rain[$i] = $row[4];
       $dat_id[$i] = $row[5];
       $i++;
    }	
    $length = count($huiv)-1; //El número de datos que se trajo de la bd
    //Separamos las horas y los minutos
    $horaf=$hora[0]; // última posisición 	
    
    $vectHora = $manag_hr -> hrvect($horaf);
    $fechap = $dia[0];
    //$fechap = $dia[$length];    //el día de la medición
                                //se separa el día, mes y año

    $fecha_part = preg_split("(/)", $fechap, 0, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE); 
    //include ('js_graf.js')
    //include ('graf_pr.js')

    function arreglarDatos($objHora, $bdHora, $bdVar, $bdDia, $tamano){
        //con el fin colocar losdatos extraidos de la bd en un arreglo para que Highchart 
                //lo grafique
                $hrant = ($objHora -> hrmil($bdHora[0]))-1;
                for ($i = 0; $i <= $tamano ; $i++) {
                    $dif = 0;
                    // Hay unos datos los cuales no se definen como enteros, como por ejemplo "---" lo cual, no permite a la 
                    // API realizar la gráfica, por lo tanto se hace necesario un bloque de código para corregir esto.
                    // Primero se comprueba que si el dato es erroneo, si ese es el caso se pone en esa pocisión el dato anterior
                    // a ese,y si también es erroneo se toma el anteriora esey así sucesivamente hasta que el dato que se va a 
                    // gráfcar se correcto.
                    $hract = $objHora -> hrmil($bdHora[$i]);
                    $verf = $objHora -> verfhr($hrant, $hract);
                    
                    if($verf == true){
                                                
                        if ($bdVar[$i] == "---"){
                            $cont = 1;
                            $varcont = $bdVar[$i];
                            while($varcont == "---"){
                                $varcont = $bdVar[$i-$cont];
                                $cont++;
                            }                               
                            echo $varcont.","; 
                            
                        }else{
                            echo $bdVar[($i)].",";
                        }
                    }else{                        
                        $vectHract =  $objHora -> hrvect($bdHora[$i]);
                        $vectHrant =  $objHora -> hrvect($bdHora[($i-1)]);

                        $diaAct = preg_split("(/)", $bdDia[$i], 0, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);
                        $diaAnt = preg_split("(/)", $bdDia[($i-1)], 0, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);
                        // En caso de que la bd mande un dato que ya envió antes, que paso el 1/25/20 11:56p, se hace unas validaciones                    
                        if (($diaAct[2] == $diaAnt[2]) && ($diaAct[0]== $diaAnt[0]) && ($diaAct[1] == $diaAnt[1]) && (($hract - $hrant)< 0)){
                            $bdHora[$i] = $bdHora[$i-1];    // si sí son ciertas esas validaciones, se deja la hora anterior como el actual de 
                                                            //para que no afecte la siguiente validación
                        }else{
                            $dif = $objHora -> dif_mint($diaAct[2]+2000, $diaAct[0], $diaAct[1] ,$vectHract[0], $vectHract[1],$diaAnt[2]+2000, $diaAnt[0], $diaAnt[1] ,$vectHrant[0], $vectHrant[1]);

                            for ($k = 0; $k < ($dif) ; $k++){
                                echo "0.0,";
                            }
                        }                
                        

                    }
                    $hrant = $hract;
                }
    }
    $horaultima=$hora[$length]; // última posisición 	

    $hrvectul = $manag_hr -> hrvect($horaultima);
    $hrvectul = $hrvectul[0]*100 + $hrvectul[1];   
    $ultimoDato = $dat_id[$length]; 
    //include ('graf_dinaBD.js')
    include ('graf_st_dina.js')
?>

    