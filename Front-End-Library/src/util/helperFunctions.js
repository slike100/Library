export function sortBooksById(books) {
  return books.sort((a, b) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });
}

export function setFallbackValues(bookArr) {
  const rowSections = [
    "title",
    "author",
    "cover",
    "synopsis",
    "numPages",
    "pubDate",
    "rating"
  ];
  for (let i = 0; i < bookArr.length; i++) {
    for (let j = 0; j < rowSections.length; j++) {
      if (!bookArr[i][rowSections[j]]) bookArr[i][rowSections[j]] = "";
    }
  }
  return bookArr;
}

export function unique(array) {
  return array.filter((e, i, arr) => arr.indexOf(e) === i);
}
