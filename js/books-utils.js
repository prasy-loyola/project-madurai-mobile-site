function filterBooks(books, criteria) {
  return books.filter((book, index) => {
    let isSelected = true;
    if (notEmpty(criteria.text)) {
      isSelected =
        book.name.indexOf(criteria.text >= 0) ||
        book.author.indexOf(criteria.text >= 0);
    } else if (notEmpty(criteria.author)) {
      isSelected =
        book.author.split(";").filter((a) => a.trim() === criteria.author)
          .length > 0;
    } else if (notEmpty(criteria.category)) {
      isSelected = book.category === criteria.category;
    } else if (notEmpty(criteria.tag)) {
      isSelected = book.tags.indexOf("#" + criteria.tag) >= 0;
    }

    if (criteria.epub) {
      isSelected = notEmpty(book.epub);
    }

    if (criteria.pdf) {
      isSelected = notEmpty(bogetAllBookDataok.pdf);
    }
    return isSelected;
  });
}

const booksDataJson = "./data/books-data.json";
const booksMetaDataJson = "./data/books-metadata.json";

$.ajaxSetup({
  async: true,
});

function getAllBookData(displayFunctions) {
  var jqxhr = $.getJSON(booksDataJson, function (data) {
    allBooks = data;
    displayFunctions.forEach((f) => f(data));
  })
    .fail(function () {
      console.log("Couldn't get Book Data");
    })
    .always(function () {
      console.log("Got Book Data ");
    });
}

function getBooksMetadata(displayFunctions) {
  var jqxhr = $.getJSON(booksMetaDataJson, function (data) {
    booksMetaData = data;
    displayFunctions.forEach((f) => f(data));
  })
    .fail(function () {
      console.log("Couldn't get Books Metadata");
    })
    .always(function () {
      console.log("Got Books Metadata ");
    });
}
