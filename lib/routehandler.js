const routeHandler = {};
const { userRoute } = require("../route/userRoute");
const { bookRoute } = require("../route/bookRoute");
const { borrowRoute } = require("../route/borrowRoute");

// Book Router
routeHandler._books = (data, callback) => {
  const acceptableHeaders = ["post", "get", "put", "delete"];
  if (acceptableHeaders.indexOf(data.method) > -1) {
    bookRoute[data.method](data, callback);
  } else {
    callback(405);
  }
};

// User Router
routeHandler._users = (data, callback) => {
  // inside of the User, we will have a create User function
  // a delete user function and an update user function
  const acceptableHeaders = ["post", "get", "put", "delete"];
  if (acceptableHeaders.indexOf(data.method) > -1) {
    userRoute[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Borrow Router
routeHandler._borrow = (data, callback) => {
  // for borrowing using get method and returning books using post
  const acceptableHeaders = ["post", "get", "put", "delete"];
  if (acceptableHeaders.indexOf(data.method) > -1) {
    borrowRoute[data.method](data, callback);
  } else {
    callback(405);
  }

  console.log("In the borrow route");
};

// Ping Router
routeHandler.ping = (data, callback) => {
  callback(200, { response: "server is live" });
};

// Notfound Router
routeHandler.notfound = (data, callback) => {
  callback(404, { response: "not found" });
};

module.exports = routeHandler;
