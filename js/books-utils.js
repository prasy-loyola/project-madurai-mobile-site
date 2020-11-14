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
      isSelected = notEmpty(book.pdf);
    }
    return isSelected;
  });
}

const booksDataJson = "./data/books-data.json";

function getAllBookData(displayFunctions) {
  var jqxhr = $.getJSON(booksDataJson, function (data) {
    displayFunctions.forEach((f) => f(data));
  })
    .fail(function () {
      console.log("error");
    })
    .always(function () {
      console.log("complete");
    });
}
