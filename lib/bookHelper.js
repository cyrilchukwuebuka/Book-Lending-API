const fileUtil = require("./fileUtil");
const booksDecrement = (bookname) => {
  console.log("bookname", bookname);

  if (bookname) {
    fileUtil.read("books", bookname, (err, data) => {
      console.log(`
      BookDecrement`);
      if (!err && data) {
        UpdatingLibraryBook(data)
      } else {
        console.log("could not reduce book count");
      }
    });
  } else {
    console.log("could not read book from library for decrement");
  }

  const UpdatingLibraryBook = (bookData) => {
    if (parseInt(bookData.available, 10) > 0) {
      let bookCount = parseInt(bookData.available, 10) - 1;
      bookData.available = bookCount.toString();
      fileUtil.update("books", bookname, bookData, (err) => {
        if (!err) {
          console.log("Book count updated")
        } else {
          console.log("Book count not updated")
        }
      });
    } else {
      console.log("Could not Update Book availability in Library");
    }
  }
};

const booksIncrement = (bookname) => {
  let bookData = "";

  if (bookname) {
    fileUtil.read("books", bookname, (err, data) => {
      console.log(`
      BookIncrement`);
      // if (!err && data) {
      //   bookData = data;
      //   bookData.available += 1;
      //   callback(200, { message: "book retrieved", data: data });
      // } else {
      //   callback(404, {
      //     err: err,
      //     data: data,
      //     message: "could not retrieve book",
      //   });
      // }
    });
  } else {
    callback(404, { message: "book not found", data: null });
  }

  if (bookData !== "") {
    fileUtil.update("books", bookname, bookData, (err) => {
      // if (!err) {
      //   callback(200, { message: "book incremented" });
      // } else {
      //   callback(400, {
      //     err: err,
      //     data: null,
      //     message: "could not increment book",
      //   });
      // }
    });
  }
};

module.exports = { booksDecrement, booksIncrement };
