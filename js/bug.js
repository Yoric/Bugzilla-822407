(function() {
  console.log(1);
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://yoric.github.com/Bugzilla-822407/img/large_image_from_wikipedia.jpg", true);
  console.log(2);
  xhr.responseType = "moz-blob";
  console.log(3);
  xhr.onload = function() {
    console.log(4);
    var reader = new FileReader();
    reader.onload = function() {
      document.getElementById("img").src = reader.result;
    };
    reader.readAsDataURL(xhr.result);
  };
  xhr.send();
})();