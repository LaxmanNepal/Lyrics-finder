<?php
  require("lib/simple_html_dom.php");

  $url = $_GET["url"];

  $content = file_get_html($url);
  $div = $content->find(".main-page", 0)->first_child()->find(".text-center", 1)->find("div", 6);

  echo $div;

?>
