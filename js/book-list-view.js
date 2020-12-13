const epubBaseFolder = "data/epub/";
const pdfBaseFolder = "/data/pdf/";
var groupingCriteria = { category: false, alphabetical: false };

var allBooks;
var booksMetaData;

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
  displayFilteredBooksTab,
  applyFilterEventListener,
];

function filterBooksOnCriteria(event) {
  filterCriteria = getFilterCriteriaFromURL();
  [
    updateBreadCrumbs,
    displayFilteredBooksTab,
    applyFilterEventListener,
  ].forEach((fn) => {
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

getAllBookData([
  ...displayFunctions,
  () => {
    getBooksMetadata([displayPopulaBooksTab]);
  },
]);

function showSearchedBooks(searchText) {
  searchText = searchText.toLowerCase();
  let searchedBooksList = $("#searchedBookList").html("");
  let allBooksList = $(".worksTabContent");
  if (searchText.trim() === "") {
    searchedBooksList.hide();
    allBooksList.show();
  } else {
    searchedBooksList.show();
    allBooksList.hide();
    let filteredBooks = allBooks.filter((book) => {
      return (
        book.name.toLowerCase().indexOf(searchText) >= 0 ||
        book.author.toLowerCase().indexOf(searchText) >= 0
      );
    });

    if (filteredBooks.length < 1) {
      $(
        `<p>Can't find any books/authors matching "<span class="font-weight-bold">${searchText}</span>"</p>`
      ).appendTo(searchedBooksList);
    }
    filteredBooks.forEach((book) => {
      bookAsCard(book).appendTo(searchedBooksList);
    });
  }
}

$("#searchText").on("keyup", (e) => {
  const searchText = $(e.target).val();
  showSearchedBooks(searchText);
});
$("#searchText").on("change", (e) => {
  const searchText = $(e.target).val();
  showSearchedBooks(searchText);
});
$("#searchText").on("search", (e) => {
  $(e.target).trigger("blur");
});
