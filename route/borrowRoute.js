const fileUtil = require("../lib/fileUtil");
const { booksDecrement } = require("../lib/bookHelper");
const {
  getBorrowedBook,
  writeToBorrowBooks,
} = require("../lib/borrowedBookHelper");

const routeHandler = {};

// Borrow and Return Router
routeHandler._borrow = (data, callback) => {
  // for borrowing using get method and returning books using post
  const acceptableHeaders = ["post", "get", "put", "delete"];
  if (acceptableHeaders.indexOf(data.method) > -1) {
    routeHandler.Borrow[data.method](data, callback);
  } else {
    callback(405);
  }
  console.log("In the borrow route");
};

// main borrow route object
routeHandler.Borrow = {};

// For returning already borrowed book back to the book Library
routeHandler.Borrow.post = (data, callback) => {
  const borrowedBookid = data.query.borrowedBookid;
  const userId = data.query.userid;

  getBorrowedBook(borrowedBookid, userId);
};

// For borrowing book for the Book Library
// Library book Id(ie the storage name) is required
routeHandler.Borrow.get = (data, callback) => {
  if (data.query.bookname && data.query.userid) {
    fileUtil.read("books", data.query.bookname, (err, borrowData) => {
      console.log(``);
      console.log(borrowData);
      if (!err && borrowData) {
        if (borrowData.available) {
          console.log(`inside
          `);
          booksDecrement(data.query.bookname);
          writeToBorrowBooks(data, borrowData);
          callback(200, { message: "book retrieved", data: borrowData });
        } else {
          callback(200, { message: "Book not in Library" });
        }
      } else {
        callback(404, {
          err: err,
          data: borrowData,
          message: "could not borrow book",
        });
      }
    });
  } else {
    callback(404, { message: "book or user not found", data: null });
  }
};

module.exports = {
  borrowRoute: routeHandler.Borrow,
};

// Typical get book search key
// http://localhost:8080/borrow?bookname=book8w7lhcyugxnb8zrtg7oa3f0sxleklp&userid=user48t9p5ds669nanc16pd8vymbwsqqsk

// Typical Return book search key
// http://localhost:8080/borrow?borrowedBookid=borrowedBookc5jabrj12hhxmny&userid=user48t9p5ds669nanc16pd8vymbwsqqsk
