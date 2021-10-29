const helper = require("./helper");
const { booksDecrement, booksIncrement } = require("../lib/bookHelper");

// Borrow and Return Router
routeHandler._borrow = (data, callback) => {
  // for borrowing using get method and returning books using post
  const acceptableHeaders = ["post", "get", "put", "delete"];
  if (acceptableHeaders.indexOf(data.method) > -1) {
    routeHandler.Borrow[data.method](data, callback);
  } else {
    callback(405);
  }
  console.log("In the user route");
};

// main borrow route object
routeHandler.Borrow = {};

// I might not be in need for this function in borrowing book
routeHandler.Borrow.post = (data, callback) => {
  const borrowedBookid = data.query.borrowedBookid;
  const userId = data.query.userid;

  const borrowedBook = getBorrowedBook(borrowedBookid);
  booksIncrement(borrowedBook.bookId);
  updateBorrowedBook(borrowedBookid);

  const user = getUser(userId);
  user.books = user.books.filter((book) => book.bookId !== borrowedBook.bookId);
  updateUser(user, userId);
};

routeHandler.Borrow.get = (data, callback) => {
  if (data.query.bookname) {
    fileUtil.read("books", data.query.bookname, (err, borrowData) => {
      if (!err && borrowData) {
        if (borrowData.payload.available) {
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
    callback(404, { message: "book not found", data: null });
  }
};

module.exports = {
  borrowRoute: routeHandler.Borrow,
};
