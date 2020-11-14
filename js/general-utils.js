function notEmpty(obj) {
  return obj && obj !== "";
}

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
};

function unique(array) {
  return array.reduce(function (previous, current) {
    if (
      !previous.find(function (prevItem) {
        return prevItem === current;
      })
    ) {
      previous.push(current);
    }
    return previous;
  }, []);
}
