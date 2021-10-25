const fileUtil = require("./fileUtil");
const routeHandler = {};
const helper = require("./helper");

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
  if (name && price && author && publisher) {
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

routeHandler.Borrow.post = (data, callback) => {};

routeHandler.Borrow.get = (data, callback) => {};

routeHandler.Borrow.put = (data, callback) => {};

routeHandler.Borrow.delete = (data, callback) => {};

routeHandler.ping = (data, callback) => {
  callback(200, { response: "server is live" });
};

routeHandler.notfound = (data, callback) => {
  callback(404, { response: "not found" });
};

module.exports = routeHandler;
