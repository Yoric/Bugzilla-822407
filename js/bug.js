(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame;
  var eltLoading = document.getElementById("loading");
  var eltImg = document.getElementById("img");
  var log = function log(text) {
    eltLoading.textContent = text;
    console.log(text);
  };

  // Measure responsiveness
  var countingDown = false; // Only display 2000 frames after loading
  // is complete
  var framesCountdown = 2000;
  var previousStamp = Date.now();
  var maxDelta = 0;
  var responsiveness = function responsiveness(timestamp) {
    var delta = timestamp - previousStamp;
    maxDelta = Math.max(maxDelta, delta);
    previousStamp = timestamp;
    if (countingDown) {
      if (--framesCountdown <= 0) {
        log("Test complete, max delta between "+
            "frames: " + maxDelta + "ms");
        return;
      } else {
        log("Responsiveness test in progress, current delta between " +
          "frames is " + delta + "ms, max delta is " + maxDelta + "ms, " +
            framesCountdown + " frames to go");
      }
    }
    requestAnimationFrame(responsiveness);
  };
  requestAnimationFrame(responsiveness);

  // Load stuff
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "img/large_image_from_wikipedia.jpg", true);
  xhr.responseType = "moz-blob";
  var progress = 0;
  xhr.onprogress = function(evt) {
    if (evt.lengthComputable) {
      var newProgress = Math.round((evt.loaded * 100) / evt.total);
      if (newProgress > progress) {
        progress = newProgress;
        log("Downloading: " + newProgress + "%");
      }
    } else {
      log("Progress:" + evt.loaded);
    }
  };
  xhr.onload = function() {
    log("XHR complete, converting to data URL");
    var reader = new window.FileReader();
    reader.onload = function() {
      log("Assigning data url as image source");
      eltImg.src = reader.result;
      log("Waiting for image to be fully loaded");
    };
    reader.readAsDataURL(xhr.response);
  };

  eltImg.addEventListener("load", function() {
    log("Image load complete, measuring responsiveness for a few more seconds");
    var rect = eltImg.getBoundingClientRect();
    countingDown = true;
  });
  xhr.send();

})();