const fileUtil = require("./fileUtil");
const routeHandler = {};
const helper = require("./helper");

//////////////////////////////////////////////////////////////////
//////////////////    USER ROUTE   ////////////////////////////

// User Router
routeHandler._users = (data, callback) => {
  // inside of the User, we will have a create User function
  // a delete user function and an update user function
  const acceptableHeaders = ["post", "get", "put", "delete"];
  if (acceptableHeaders.indexOf(data.method) > -1) {
    routeHandler.Users[data.method](data, callback);
  } else {
    callback(405);
  }
  console.log("In the user route");
};

// main user route object
routeHandler.Users = {};

routeHandler.Users.post = (data, callback) => {
  var firstname =
    typeof data.payload.firstname === "string" &&
    data.payload.firstname.trim().length > 0
      ? data.payload.firstname
      : false;
  var lastname =
    typeof data.payload.lastname === "string" &&
    data.payload.lastname.trim().length > 0
      ? data.payload.lastname
      : false;
  var phoneNo =
    typeof data.payload.phoneNo === "string" &&
    !isNaN(parseInt(data.payload.phoneNo))
      ? data.payload.phoneNo
      : false;
  var email =
    typeof data.payload.email === "string" &&
    data.payload.email.trim().length > 0
      ? data.payload.email
      : false;
  if (firstname && lastname && phoneNo && email) {
    const fileName = "user" + helper.generateRandomString(30);
    fileUtil.create("users", fileName, data.payload, (err) => {
      if (!err) {
        callback(200, { message: "user added successfully", data: null });
      } else {
        callback(400, { message: "couldn't add user" });
      }
    });
  }
};

routeHandler.Users.get = (data, callback) => {
  if (data.query.userid) {
    fileUtil.read("users", data.query.userid, (err, data) => {
      if (!err && data) {
        callback(200, { message: "user retrieved", data: data });
      } else {
        callback(404, {
          err: err,
          data: data,
          message: "could not retrieve user",
        });
      }
    });
  } else {
    callback(404, { message: "user not found", data: null });
  }
};

routeHandler.Users.put = (data, callback) => {
  if (data.query.userid) {
    fileUtil.update("users", data.query.userid, data.payload, (err) => {
      if (!err) {
        callback(200, { message: "user updated successfully" });
      } else {
        callback(400, {
          err: err,
          data: null,
          message: "could not update user",
        });
      }
    });
  } else {
    callback(404, { message: "user not found" });
  }
};

routeHandler.Users.delete = (data, callback) => {
  if (data.query.userid) {
    fileUtil.delete("users", data.query.userid, (err) => {
      if (!err) {
        callback(200, { message: "user deleted successfully" });
      } else {
        callback(400, { err: err, message: "could not delete user" });
      }
    });
  } else {
    callback(404, { message: "user not found" });
  }
};

// Book Router
routeHandler._books = (data, callback) => {
  const acceptableHeaders = ["post", "get", "put", "delete"];
  if (acceptableHeaders.indexOf(data.method) > -1) {
    routeHandler.Books[data.method](data, callback);
  } else {
    callback(405);
  }
};

//////////////////////////////////////////////////////////////////
//////////////////    BOOK ROUTE   ////////////////////////////

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

//////////////////////////////////////////////////////////////////
//////////////////    BORROW ROUTE   ////////////////////////////

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
  const bookId = data.query.bookid;
  const borrowedBookid = data.query.borrowedBookid;
  const userId = data.query.userid;

  const user = readUser(userId);
  updateUser(user, userId)
};

routeHandler.Borrow.get = (data, callback) => {
  if (data.query.bookname) {
    fileUtil.read("books", data.query.bookname, (err, borrowData) => {
      if (!err && borrowData) {
        if (borrowData.payload.available) {
          booksDecrement(data.query.bookname, borrowData);
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

////////////////////////////////////////////////////////////////
///////// For Borrowing book from the library//////////////////

const booksDecrement = (bookname, borrowBook) => {
  borrowBook.payload.available -= 1;

  fileUtil.update("books", bookname, borrowBook, (err) => {
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
};

const booksIncrement = (bookname, returnBook) => {
  borrowBook.payload.available += 1;

  fileUtil.update("books", bookname, borrowBook, (err) => {
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
};

/////////////////////////////////////////////////////////
/////////////////// Return /////////////////////////////
const readUser = (userid) => {
  let user = {};

  if (userid) {
    fileUtil.read("users", userid, (err, data) => {
      if (!err && data) {
        user = data;
        callback(200, { message: "user retrieved", data: data });
      } else {
        callback(404, {
          err: err,
          data: data,
          message: "could not retrieve user",
        });
      }
    });
  } else {
    callback(404, { message: "book not found", data: null });
  }

  if (user) {
    return user;
  }
};

const updateUser = (user, userId) => {
    
}

const writeToBooks = (data, borrowData) => {};

//////////////////////////////////////////////////////////
/////////////////// BORROW //////////////////////////////
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

const writeToUser = (data, borrowData) => {
  const userid = data.query.userid;

  fileUtil.read("users", userid, (err, userData) => {
    if (!err && userData) {
      updateUser(userData, borrowData);
      callback(200, { message: "user retrieved", data: userData });
    } else {
      callback(404, {
        err: err,
        data: userData,
        message: "could not retrieve user",
      });
    }
  });

  const updateUser = (userData, borrowData) => {
    const mUserData = {
      firstname: userData.firstname,
      lastname: userData.lastname,
      phoneNo: userData.phoneNo,
      email: userData.email,
      books: userData.books.push(borrowData),
    };

    fileUtil.update("users", userid, mUserData, (err) => {
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
  };
};
/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

routeHandler.Borrow.put = (data, callback) => {};

routeHandler.Borrow.delete = (data, callback) => {
  if (data.query.bookname) {
    fileUtil.delete("borrowedBooks", data.query.bookname, (err) => {
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

routeHandler.ping = (data, callback) => {
  callback(200, { response: "server is live" });
};

routeHandler.notfound = (data, callback) => {
  callback(404, { response: "not found" });
};

module.exports = routeHandler;
