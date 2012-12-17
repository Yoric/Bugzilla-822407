(function() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "img/large_image_from_wikipedia.jpg", true);
  xhr.responseType = "moz-blob";
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onload = function() {
      console.log("About to set src");
      document.getElementById("img").src = reader.result;
      console.log("I have set src");
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.send();
})();