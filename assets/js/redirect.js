(function () {
  var supported = ["fr", "en", "it", "de"];
  var browserLang = (navigator.language || "fr").slice(0, 2).toLowerCase();
  var lang = supported.includes(browserLang) ? browserLang : "fr";
  window.location.replace("/" + lang + "/index.html");
})();
