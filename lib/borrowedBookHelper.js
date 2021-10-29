const fileUtil = require("./fileUtil");
const { writeToUser } = require("./userHelper");

const getBorrowedBook = (bookid) => {
  let borrowedBook = "";

  if (bookid) {
    fileUtil.read("borrowedBooks", bookid, (err, data) => {
      if (!err && data) {
        borrowedBook = data;
        callback(200, { message: "Book retrieved", data: data });
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

  if (!borrowedBook) {
    return borrowedBook;
  }
  
  return null;
};

const updateBorrowedBook = (borrowedBookid) => {
  if (borrowedBookid) {
    fileUtil.delete("borrowedBooks", borrowedBookid, (err) => {
      if (!err) {
        callback(200, { message: "book deleted successfully" });
      } else {
        callback(400, { err: err, message: "could not delete book" });
      }
    });
  } else {
    callback(404, { message: "book not found" });
  }
};

const writeToBorrowBooks = (data, borrowData) => {
  const parsedData = {
    name: borrowData.payload.name,
    price: borrowData.payload.price,
    author: borrowData.payload.author,
    publisher: borrowData.payload.publisher,
    isbn_number: borrowData.payload.isbn_number,
    cover_image_url: borrowData.payload.cover_image_url,
    bookId: data.query.bookname,
  };

  fileUtil.create("borrowBooks", parsedData.isbn_number, parsedData, (err) => {
    if (!err) {
      callback(200, { message: "book borrowed successfully", data: null });
    } else {
      callback(400, { message: "couldn't Write to borrowBooks" });
    }
  });

  writeToUser(data, parsedData);
};

module.exports = { getBorrowedBook, updateBorrowedBook, writeToBorrowBooks };
