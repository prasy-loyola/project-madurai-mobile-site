const epubBaseFolder = "data/epub/";
const pdfBaseFolder = "/data/pdf/";
var groupingCriteria = { category: false, alphabetical: false };

var allBooks;

var filterCriteria = {
  text: getUrlParameter("text"),
  category: getUrlParameter("category"),
  tag: getUrlParameter("tag"),
  author: getUrlParameter("author"),
  epub: false,
  pdf: false,
};

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

var isFiltered =
  filterCriteria.author || filterCriteria.category || filterCriteria.tag;

var displayFunctions = [
  displayBooks,
  displayNavCategories,
  displayCategoriesTab,
  displayAuthorsTab,
];

function filterBooksOnCriteria(event) {
  let filterCriteriaData = $(event.target).data();
  filterCriteria = {};
  filterCriteria[filterCriteriaData.criteria] = filterCriteriaData.value;
}

getAllBookData(displayFunctions);

if (isFiltered) {
  $("#all-works-tab").tab("show");
  $("#all-works-tab").text("Filtered Works");
  let breadcrum = $(".breadcrumb");
  $(
    `<li class="breadcrumb-item active">${getFilteredCriteriaAsText(
      filterCriteria
    )}</li>`
  ).appendTo(breadcrum);
}

console.log("test");
