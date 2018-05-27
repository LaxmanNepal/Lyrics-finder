var searchedit = document.getElementById("search");
var searchlist = document.getElementById("songs");
var lyricdiv = document.getElementById("lyric");
var timer;

function searchSongs() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      writeList(this.responseText);
    }
  };

  if (timer != null)
    window.clearTimeout(timer);

  timer = setTimeout(function()
  {
    var name = searchedit.value;
    xhttp.open("GET", "search.php?sname=" + encodeURI(name), true);
    xhttp.send();
    searchlist.style.textAlign = "center";
    searchlist.innerHTML = "<img src='css/loader.gif' width=50px height=50px>";
    timer = null;
  }, 1000);

}

function writeList(data){
  if (data != 0){
    data = JSON.parse(data);
    var newList = "";
    for (var i=0; i<data.length; i++){
      var row = data[i];
      newList += '<li onclick="loadLyric(this)" source="'+ row[2] +'">'+ row[0] +' ('+ row[1] +')</li>';
    }
    searchlist.innerHTML = newList;
  }
  else{
    searchlist.innerHTML = "<li>No se encuentran resultados con ese nombre :(</li>";
  }
  searchlist.style.textAlign = "left";
}

function loadLyric(e){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      writeLyric(this.responseText, e.innerHTML);
    }
  };
  var url = e.getAttribute("source");
  xhttp.open("GET", "getlyric.php?url=" + encodeURI(url), true);
  xhttp.send();
  lyricdiv.innerHTML = "<img src='css/loader.gif' width=50px height=50px>";
  lyricdiv.style.display = "block";
}

function writeLyric(data, sName){
  lyricdiv.innerHTML = "<h1>" + sName + "</h1>" + data;
}

function showList(){
  searchlist.style.display = "block";
}

function hideList(){
  searchlist.style.display = "none";
}
