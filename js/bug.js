(function() {
  var eltInput = document.getElementById("input");
  eltInput.addEventListener("change", function onchange() {
    if (!eltInput.files || !eltInput.files.length) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function() {
      document.getElementById("img").src = reader.result;
    };
    reader.readAsDataURL(eltInput.files[0]);
  });
})();