const helper = require("./helper");
const fileUtil = require("./fileUtil");

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

module.exports = { userRoute: routeHandler.Users };
