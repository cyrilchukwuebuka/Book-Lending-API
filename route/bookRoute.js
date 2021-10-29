const helper = require("./helper");
const fileUtil = require("./fileUtil");

//main book route object
routeHandler.Books = {};

//Post route -- for creating a book
routeHandler.Books.post = (data, callback) => {
  //validate that all required fields are filled out
  var name =
    typeof data.payload.name === "string" && data.payload.name.trim().length > 0
      ? data.payload.name
      : false;
  var price =
    typeof data.payload.price === "string" &&
    !isNaN(parseInt(data.payload.price))
      ? data.payload.price
      : false;
  var author =
    typeof data.payload.author === "string" &&
    data.payload.author.trim().length > 0
      ? data.payload.author
      : false;
  var publisher =
    typeof data.payload.publisher === "string" &&
    data.payload.publisher.trim().length > 0
      ? data.payload.publisher
      : false;
  var isbn_number =
    typeof data.payload.isbn_number === "string" &&
    data.payload.isbn_number.trim().length > 0
      ? data.payload.isbn_number
      : false;

  if (name && price && author && publisher && isbn_number) {
    const fileName = "book" + helper.generateRandomString(30);
    fileUtil.create("books", fileName, data.payload, (err) => {
      if (!err) {
        callback(200, { message: "book added successfully", data: null });
      } else {
        callback(400, { message: "couldn't add book" });
      }
    });
  }
};

//Get route -- for geting a book
routeHandler.Books.get = (data, callback) => {
  if (data.query.bookname) {
    fileUtil.read("books", data.query.bookname, (err, data) => {
      if (!err && data) {
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
};

//Put route -- for updating a book
routeHandler.Books.put = (data, callback) => {
  if (data.query.bookname) {
    fileUtil.update("books", data.query.bookname, data.payload, (err) => {
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
  } else {
    callback(404, { message: "book not found" });
  }
};

//Delete route -- for deleting a book
routeHandler.Books.delete = (data, callback) => {
  if (data.query.bookname) {
    fileUtil.delete("books", data.query.bookname, (err) => {
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


module.exports = {
  bookRoute: routeHandler.Books
};