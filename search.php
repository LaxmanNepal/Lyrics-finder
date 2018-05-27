<?php
  // Powered by AZLyrics
  // Simple lyrics finder
  require("lib/simple_html_dom.php");
  $songName = urlencode($_GET["sname"]);

  $url = "https://search.azlyrics.com/search.php?q=$songName&w=songs&p=1";
  $content = file_get_html($url);

  $table = $content->find("table",0);
  if (isset($table)){
    $table = $table->children();
    if ($table[0]->first_child()->first_child()->plaintext == "1"){
      array_shift($table);
      array_pop($table);
    }

    $lista = array();
    //echo count($table);
    foreach($table as $tr){
      $td = $tr->children(0);

      $sName = $td->first_child()->plaintext;
      $sAuthor = $td->children(1)->plaintext;
      $sUrl = $td->first_child()->href;

      array_push($lista, array($sName, $sAuthor, $sUrl));
    }

    echo json_encode($lista);
  }
  else{
    echo 0;
  }
?>
