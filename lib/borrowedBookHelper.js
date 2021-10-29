const fileUtil = require("./fileUtil");
const helper = require("../lib/helper");
const { writeToUser } = require("./userHelper");

const getBorrowedBook = (bookid) => {
  let borrowedBook = "";

  if (bookid) {
    fileUtil.read("borrowedBooks", bookid, (err, data) => {
      console.log(`
      getBorowedBook`);
      // if (!err && data) {
      //   borrowedBook = data;
      //   callback(200, { message: "Book retrieved", data: data });
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

  if (!borrowedBook) {
    return borrowedBook;
  }
  
  return null;
};

const updateBorrowedBook = (borrowedBookid) => {
  if (borrowedBookid) {
    fileUtil.delete("borrowedBooks", borrowedBookid, (err) => {
      console.log(`
      updateBorrowedBook`);
      // if (!err) {
      //   callback(200, { message: "book deleted successfully" });
      // } else {
      //   callback(400, { err: err, message: "could not delete book" });
      // }
    });
  } else {
    callback(404, { message: "book not found" });
  }
};

const writeToBorrowBooks = (data, borrowData) => {
  console.log(`
  Borrowed Book`)

  const filename = "borrowedBook" + helper.generateRandomString(15);
  console.log(filename)

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
    // if (!err) {
    //   callback(200, { message: "book borrowed successfully", data: null });
    // } else {
    //   callback(400, { message: "couldn't Write to borrowBooks" });
    // }
  });

  writeToUser(data, parsedData);
};

module.exports = { getBorrowedBook, updateBorrowedBook, writeToBorrowBooks };
