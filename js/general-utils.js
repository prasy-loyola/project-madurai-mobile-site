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

function compareText(text1, text2) {
  let isTxt1English = text1.charCodeAt(0) > 122;
  let isTxt2English = text2.charCodeAt(0) > 122;

  if (isTxt1English === isTxt2English) {
    return text1 > text2 ? 1 : -1;
  } else {
    return isTxt2English ? 1 : -1;
  }
}
