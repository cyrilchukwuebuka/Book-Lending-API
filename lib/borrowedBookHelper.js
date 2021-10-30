const fileUtil = require("./fileUtil");
const helper = require("./helper");
const { writeToUser } = require("./userHelper");
const { booksIncrement } = require("./bookHelper");
const { getUser } = require("./userHelper");

const getBorrowedBook = (bookid, userId) => {
  if (bookid) {
    fileUtil.read("borrowedBooks", bookid, (err, data) => {
      console.log(`
      getBorowedBook`, data);
      if (!err && data) {
        booksIncrement(data.bookId);
        getUser(userId, data.bookId);
        updateBorrowedBook(bookid);
        console.log("Book retrieved")
      } else {
        console.log("Book not retrieved")
      }
    });
  } else {
    console.log("book not found")
  }
};

const updateBorrowedBook = (borrowedBookid) => {
  if (borrowedBookid) {
    fileUtil.delete("borrowedBooks", borrowedBookid, (err) => {
      console.log(`
      updateBorrowedBook`);
      if (!err) {
        console.log(`Borrowed Books has been delete`)
      } else {
        console.log("could not delete book")
      }
    });
  } else {
    console.log("Borrowed book not found")
  }
};

const writeToBorrowBooks = (data, borrowData) => {
  console.log(`
  Borrowed Book`);

  const filename = "borrowedBook" + helper.generateRandomString(15);
  console.log(filename);

  const parsedData = {
    name: borrowData.name,
    price: borrowData.price,
    author: borrowData.author,
    publisher: borrowData.publisher,
    isbn_number: borrowData.isbn_number,
    cover_image_url: borrowData.cover_image_url,
    bookId: data.query.bookname,
  };

  fileUtil.create("borrowedBooks", filename, parsedData, (err) => {
    console.log(`
      WriteToBorrowedBooks`);
    if (!err) {
      cconsole.log(`
      Book stored at borrowedBook Library`);
    } else {
      console.log(`
      could not store borrowed book at borrowedBook Library`);
    }
  });

  writeToUser(data, parsedData);
};

module.exports = { getBorrowedBook, updateBorrowedBook, writeToBorrowBooks };
