const epubBaseFolder = "data/epub/";
const pdfBaseFolder = "/data/pdf/";
var groupingCriteria = { category: false, alphabetical: false };

var allBooks;

function getFilterCriteriaFromURL() {
  return {
    text: getUrlParameter("text"),
    category: getUrlParameter("category"),
    tag: getUrlParameter("tag"),
    author: getUrlParameter("author"),
    epub: false,
    pdf: false,
  };
}

var filterCriteria = getFilterCriteriaFromURL();

var isFiltered =
  filterCriteria.author || filterCriteria.category || filterCriteria.tag;

function getFilteredCriteriaAsText(filterCriteria) {
  return filterCriteria.text
    ? `Text: "${filterCriteria.text}"`
    : filterCriteria.category
    ? `Category: "${filterCriteria.category}"`
    : filterCriteria.author
    ? `Author: ${filterCriteria.author}`
    : filterCriteria.tag
    ? `Tag: "${filterCriteria.tag}"`
    : "";
}

var displayFunctions = [
  displayBooks,
  //   displayNavCategories,
  displayCategoriesTab,
  displayAuthorsTab,
  updateBreadCrumbs,
  applyFilterEventListener,
];

function filterBooksOnCriteria(event) {
  filterCriteria = getFilterCriteriaFromURL();
  displayFunctions.forEach((fn) => {
    fn(allBooks);
  });
}

function applyFilterEventListener() {
  $(".filter-component").each((ind, elem) => {
    elem.onclick = null;

    $(elem).on("click", function (event) {
      event.preventDefault();
      let href = event.target.href;
      if (event.target.tagName.toLowerCase() != "a") {
        href = event.target.parentElement.href;
      }
      window.history.pushState(
        { pageTitle: "Project Madurai: Filtered Works" },
        "Project Madurai: Filtered Works",
        href
      );
      isFiltered = $(elem).data().filtered == false ? false : true;
      filterBooksOnCriteria();
    });
  });
}

getAllBookData(displayFunctions);
