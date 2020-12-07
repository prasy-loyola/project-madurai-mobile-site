function AuthorView(author) {
  if (notEmpty(author)) {
    let authorList = author.split(";").map((a) => a.trim());
    let authorDiv = $('<p class="card-text" >By: </p>');
    $.each(authorList, (key, val) => {
      $(
        `<a class="filter-component" href="?author=${val}">${val}</a>${
          authorList.length - 1 !== key ? "<span>; </span>" : ""
        }`
      ).appendTo(authorDiv);
    });
    return authorDiv;
  }
  return $("");
}

function TagsView(tagsText) {
  if (notEmpty(tagsText)) {
    let tags = tagsText
      .split("#")
      .map((t) => t.trim())
      .filter((t) => t !== "");
    let small = $('<small class="m-1 card-text"/  >');
    $('<i class="fas fa-tags"></i>').appendTo(small);
    $.each(tags, (key, val) => {
      $(
        `<a class="filter-component" href="?tag=${val}"> <span >#${val}</span> </a>`
      ).appendTo(small);
    });
    return small;
  }
  return "";
}

function CategoriesView(category) {
  if (notEmpty(category)) {
    let categories = category
      .split(";")
      .map((t) => t.trim())
      .filter((t) => t !== "");
    let categoryDiv = $('<p  class="card-text" />');
    $.each(categories, (key, val) => {
      $(
        `<small ><a class="filter-component" href="?category=${val}" > <b class="badge badge-primary">${val}</b> </a></small>`
      ).appendTo(categoryDiv);
    });
    return categoryDiv;
  }
  return $("");
}

function DownloadLinksView(links) {
  if (notEmpty(links)) {
    let linkList = links.split(";");
    let linksDiv = $('<p  class="card-text"/>');
    $.each(linkList, (key, val) => {
      let icon = val.endsWith(".pdf")
        ? `<i class="fas fa-file-pdf fa-lg" title="Download PDF"></i>`
        : `<img height="28px" src="./images/epub-icon-11.jpg" title="Download Epub"> `;

      $(
        `<a href="${epubBaseFolder}${val}"> ${icon} ${
          linkList.length > 1 ? " - " + (k + 1) : ""
        }</a>`
      ).appendTo(linksDiv);
    });
    return linksDiv;
  }
  return $("");
}

function bookAsCard(book) {
  let cardHolder = $('<div class="col-lg-3 col-md-4 col-sm-6 book-item p-1"/>');

  let card = $('<div class="card h-100"/>').appendTo(cardHolder);
  let cardBody = $('<div class="card-body"/>').appendTo(card);
  let bookTitle = $(`<h6 class="card-title">${book.name}</h6>`).appendTo(
    cardBody
  );
  let authors = AuthorView(book.author).appendTo(cardBody);
  let tags = TagsView(book.tags).appendTo(cardBody);
  let links = DownloadLinksView(book.epub).appendTo(cardBody);

  return cardHolder;
}

function displayNavCategories(data) {
  let allCategories = unique(data.map((b) => b.category).sort());
  let categoriesDropDown = $("#categories-dd");
  categoriesDropDown.html("");
  $.each(allCategories, function (key, val) {
    $(
      `<a class="dropdown-item" href="all-works.html?category=${val}">${val}</a>`
    ).appendTo(categoriesDropDown);
  });
}

function displayBooks(data) {
  let bookList = $("#bookList");
  bookList.html("");
  allBooks = data;
  allBooks.sort((a, b) => (a.name > b.name ? 1 : -1));

  $.each(allBooks, function (key, val) {
    bookAsCard(val).appendTo(bookList);
  });
}

function displayFilteredBooksTab(data) {
  let bookList = $("#filteredBookList");
  bookList.html("");
  allBooks = data;
  allBooks.sort((a, b) => (a.name > b.name ? 1 : -1));

  $("#filterCondition").html(getFilteredCriteriaAsText(filterCriteria));

  let filteredBooks = filterBooks(allBooks, filterCriteria);
  $.each(filteredBooks, function (key, val) {
    bookAsCard(val).appendTo(bookList);
  });
}

function displayPopulaBooksTab(data) {
  let bookList = $("#popularList");
  bookList.html("");
  let popularBooksIds = data.popularWorks;
  let allBooksData = {};
  allBooks.forEach((b) => (allBooksData[b.id] = b));

  $.each(
    popularBooksIds.map((bm) => allBooksData[bm]),
    function (key, val) {
      bookAsCard(val).appendTo(bookList);
    }
  );
}

function displayAuthorsTab(data) {
  let authors = data
    .map((b) => b.author.split(";"))
    .reduce((prev, curr) => [...prev, ...curr])
    .map((a) => a.trim());

  let allAuthors = unique(authors.sort());
  let allAuthorsList = $("#authorsList");
  allAuthorsList.html("");
  $.each(allAuthors, function (key, val) {
    $(
      `<a class="list-group-item filter-component" href="all-works.html?author=${val}">${val}</a>`
    ).appendTo(allAuthorsList);
  });
}

function displayCategoriesTab(data) {
  let allCategories = unique(data.map((b) => b.category).sort());
  let categoriesList = $("#categoriesList");
  categoriesList.html("");
  $.each(allCategories, function (key, val) {
    $(
      `<a class="list-group-item filter-component" href="all-works.html?category=${val}">${val}</a>`
    ).appendTo(categoriesList);
  });
}

function updateBreadCrumbs() {
  if (isFiltered) {
    $("#filtered-works-tab").show();
    $("#filtered-works-tab").tab("show");
    // $("#all-works-tab").text("Filtered Works");
    $(".filter-criteria.breadcrumb-item").each((ind, elem) => elem.remove());
    let breadcrum = $(".breadcrumb");
    $(
      `<li class="breadcrumb-item filter-criteria active">${getFilteredCriteriaAsText(
        filterCriteria
      )}</li>`
    ).appendTo(breadcrum);
  } else {
    $("#filtered-works-tab").hide();
    // $("#all-works-tab").text("All Works");
  }
}
