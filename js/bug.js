(function() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "img/large_image_from_wikipedia.jpg", true);
  xhr.responseType = "moz-blob";
  xhr.onprogress = function(evt) {
    if (evt.lengthComputable) {
      console.log("progress", evt.loaded / evt.total);
    } else {
      console.log("progress");
    }
  };
  xhr.onload = function() {
    console.log("xhr complete");
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