const epubBaseFolder = "./../data/epub/";
const pdfBaseFolder = "./../data/pdf/";
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

function displayNavCategories(data) {
  let allCategories = unique(data.map((b) => b.category).sort());
  let categoriesDropDown = $("#categories-dd");
  $.each(allCategories, function (key, val) {
    $(
      `<a class="dropdown-item" href="all-works.html?category=${val}">${val}</a>`
    ).appendTo(categoriesDropDown);
  });
}

function displayBooks(data) {
  let bookList = $("#bookList");
  let ul = $("<ul/>", {
    class: "list-group",
  }).appendTo(bookList);
  allBooks = data;
  allBooks.sort((a, b) => (a.name > b.name ? 1 : -1));
  console.log("jqxhr -> allBooks", allBooks);
  let filteredBooks = filterBooks(allBooks, filterCriteria);
  $.each(filteredBooks, function (key, val) {
    getBookAsJqueryObj(val).appendTo(ul);
  });
}

function displayBooks2(data) {
  let bookList = $("#bookList");
  allBooks = data;
  allBooks.sort((a, b) => (a.name > b.name ? 1 : -1));
  console.log("jqxhr -> allBooks", allBooks);
  let filteredBooks = filterBooks(allBooks, filterCriteria);
  $.each(filteredBooks, function (key, val) {
    bookAsCard(val).appendTo(bookList);
  });
}

function getBookAsJqueryObj(book) {
  let li = $("<li/>").addClass("list-group-item");

  let bookTitle = $(`<h5>${book.name}</h5>`).appendTo(li);

  if (notEmpty(book.author)) {
    let authorList = book.author.split(";").map((a) => a.trim());
    let authorDiv = $("<div>By: </div>").appendTo(li);
    $.each(authorList, (key, val) => {
      $(
        `<a href="?author=${val}">${val}</a>${
          authorList.length - 1 !== key ? "<span>; </span>" : ""
        }`
      ).appendTo(authorDiv);
    });
  }

  if (notEmpty(book.pdf)) {
    let pdfList = book.pdf.split(";");
    $.each(pdfList, (key, val) => {
      $(`<a href="${pdfBaseFolder}${val}"><i
        class="fas fa-file-pdf fa-lg"></i> ${
          pdfList.length > 1 ? " - " + (k + 1) : ""
        }</a>`).appendTo(li);
    });
  }

  if (notEmpty(book.tags)) {
    let tags = book.tags
      .split("#")
      .map((t) => t.trim())
      .filter((t) => t !== "");
    // $("<br/>").appendTo(li);
    let small = $('<small class="m-1"/>').appendTo(li);
    $('<i class="fas fa-tags"></i>').appendTo(small);
    $.each(tags, (key, val) => {
      $(`<a href="?tag=${val}" > <span >#${val}</span> </a>`).appendTo(small);
    });
  }

  if (notEmpty(book.category) && false) {
    let categories = book.category
      .split(";")
      .map((t) => t.trim())
      .filter((t) => t !== "");
    $.each(categories, (key, val) => {
      $(
        `<small ><a href="?category=${val}" > <b class="badge badge-primary">${val}</b> </a></small>`
      ).appendTo(li);
    });
  }
  if (notEmpty(book.epub)) {
    $("<br/>").appendTo(li);
    let epubList = book.epub.split(";");
    $.each(epubList, (key, val) => {
      $(`<a href="${epubBaseFolder}${val}"><img height="28px"
      src="./../images/epub-icon-11.jpg"> ${
        epubList.length > 1 ? " - " + (k + 1) : ""
      }</a>`).appendTo(li);
    });
  }

  return li;
}

var displayFunctions = [displayBooks2, displayNavCategories];

getAllBookData(displayFunctions);
console.log("test");
