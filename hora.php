<?php
class hora{
	
	function hrmil( $horaNor)
    {   
        $horamil = 0;
        $hora_part = preg_split("(:)", $horaNor, 0, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE); 
        $minut = $hora_part[1];

        if ($minut[2] == "a" && $hora_part[0] == 12){
            $hora_part[0] = 0;            
        }

        if($minut[2] == "a"){
            $horamil = $hora_part[0]*100 + $minut[0]*10 + $minut[1];
        }else{
            if ( $hora_part[0] == 12){
                $horamil = ($hora_part[0])*100 + $minut[0]*10 + $minut[1];
            }else{
                $horamil = ($hora_part[0] + 12)*100 + $minut[0]*10 + $minut[1];
            }
            
        }

        return $horamil;
    }

    function hrvect($horaNor)
    {   
        $horavect = array(0, 0);
        $hora_part = preg_split("(:)", $horaNor, 0, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE); 
        $minut = $hora_part[1];

        if ($minut[2] == "a" && $hora_part[0] == 12){
            $hora_part[0] = 0;            
        }           
        
        if($minut[2] == "p"){
            if ($hora_part[0] == 12){
                $horavect[0] = 12;            
            }else{
                $horavect[0] = ($hora_part[0] + 12);
            }                
        }else{
           $horavect[0] = $hora_part[0];
        }

        

        $horavect[1] = $minut[0]*10 + $minut[1];

        return $horavect;
    }

    function verfhr2 ($hrpast, $hract){
        $verf = " ";

        $hrsup = $hrpast + 1;
        if ($hrsup == 2360){
            $hrsup = 0;
        }
        if ($hrsup == $hract){
            $verf = true;
        }else{
            $verf = false;
        }
        return $verf;
    }

	function verfhr ($hrpast, $hract){
        $verf = " ";
        $hrsup = $hrpast + 1;
        if ($hrsup == 2360){
            $hrsup = 0;
        }
        if ($hrsup == $hract){
            $verf = true;
        }else{
            $verf = false;
        }
        return $verf;
    }
    function dif_mint ($año, $mes, $dia, $hr, $min , $año2, $mes2, $dia2, $hr2, $min2){
        $date1 = new DateTime("$año-$mes-$dia $hr:$min:00");
        $date2 = new DateTime("$año2-$mes2-$dia2 $hr2:$min2:00");
        $diff = $date1->diff($date2);

        return ( ($diff->days * 24 ) * 60 ) + ( $diff->h )*60 + ( $diff->i ) ;
        
    }
}
?>