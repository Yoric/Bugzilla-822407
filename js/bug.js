(function() {
  var eltLoading = document.getElementById("loading");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "img/large_image_from_wikipedia.jpg", true);
  xhr.responseType = "moz-blob";
  var progress = 0;
  xhr.onprogress = function(evt) {
    if (evt.lengthComputable) {
      var newProgress = Math.round((evt.loaded * 100) / evt.total);
      if (newProgress > progress) {
        progress = newProgress;
        eltLoading.textContent = "Downloading: " + newProgress + "%";
        console.log("xhr progress", newProgress);
      }
    } else {
      console.log("progress");
    }
  };
  xhr.onload = function() {
    eltLoading.textContent = "Converting to data URL";
    console.log("xhr complete");
    var reader = new FileReader();
    reader.onload = function() {
      eltLoading.textContent = "Showing on screen";
      console.log("About to set src");
      document.getElementById("img").src = reader.result;
      console.log("I have set src");
      eltLoading.textContent = "Load complete";
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.send();
})();