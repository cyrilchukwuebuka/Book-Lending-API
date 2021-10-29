const booksDecrement = (bookname) => {
  let bookData = "";

  if (bookname) {
    fileUtil.read("books", bookname, (err, data) => {
      if (!err && data) {
        bookData = data;
        bookData.available -= 1;
        callback(200, { message: "book retrieved", data: data });
      } else {
        callback(404, {
          err: err,
          data: data,
          message: "could not retrieve book",
        });
      }
    });
  } else {
    callback(404, { message: "book not found", data: null });
  }

  if (bookData !== "") {
    fileUtil.update("books", bookname, bookData, (err) => {
      if (!err) {
        callback(200, { message: "book updated successfully" });
      } else {
        callback(400, {
          err: err,
          data: null,
          message: "could not update book",
        });
      }
    });
  }
};

const booksIncrement = (bookname) => {
  let bookData = "";

  if (bookname) {
    fileUtil.read("books", bookname, (err, data) => {
      if (!err && data) {
        bookData = data;
        bookData.available += 1;
        callback(200, { message: "book retrieved", data: data });
      } else {
        callback(404, {
          err: err,
          data: data,
          message: "could not retrieve book",
        });
      }
    });
  } else {
    callback(404, { message: "book not found", data: null });
  }

  if (bookData !== "") {
    fileUtil.update("books", bookname, bookData, (err) => {
      if (!err) {
        callback(200, { message: "book incremented" });
      } else {
        callback(400, {
          err: err,
          data: null,
          message: "could not increment book",
        });
      }
    });
  }
};

module.exports = { booksDecrement, booksIncrement };
