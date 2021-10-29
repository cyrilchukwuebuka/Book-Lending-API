const fileUtil = require("./fileUtil");

const getUser = (userid) => {
  let user = null;

  if (userid) {
    fileUtil.read("users", userid, (err, data) => {
      console.log(`
      getUser`);
      // if (!err && data) {
      //   user = data;
      //   callback(200, { message: "user retrieved", data: data });
      // } else {
      //   callback(404, {
      //     err: err,
      //     data: data,
      //     message: "could not retrieve user",
      //   });
      // }
    });
  } else {
    callback(404, { message: "user not found", data: null });
  }

  if (!user) {
    return user;
  }

  return null;
};

const updateUser = (userObject, userId) => {
  if (userObject & userId) {
    fileUtil.update("users", userId, userObject, (err) => {
      console.log(`
      updateUser`);
      // if (!err) {
      //   callback(200, { message: "user updated successfully" });
      // } else {
      //   callback(400, {
      //     err: err,
      //     data: null,
      //     message: "could not update user",
      //   });
      // }
    });
  } else {
    callback(404, { message: "user not found" });
  }
};

const writeToUser = (data, borrowedBookData) => {
  const userid = data.query.userid;

  fileUtil.read("users", userid, (err, userData) => {
    console.log(`
      WriteToUser`);
    if (!err && userData) {
      updateUser(userData, borrowedBookData);
      // callback(200, { message: "user retrieved", data: userData });
    } else {
      // callback(404, {
      //   err: err,
      //   data: userData,
      //   message: "could not retrieve user",
      // });
    }
  });

  const updateUser = (userData, borrowedBookData) => {
    const borrowedData = [];
    const userBookArray = userData.books
    userBookArray.push(borrowedBookData)
    console.log("userBookArray", userBookArray)
    // borrowedData.push(userData.books.push(borrowedBookData));
    // borrowedData[...userData.books];
    // borrowedData.push(borrowedBookData);

    // console.log(`
    // Hello Update User`)
    // userData.books.push(borrowedBookData);
    // console.log(userData.books);

    const mUserData = {
      firstname: userData.firstname,
      lastname: userData.lastname,
      phoneNo: userData.phoneNo,
      email: userData.email,
      books: userBookArray
    };

    fileUtil.update("users", userid, mUserData, (err) => {
      if (!err) {
        console.log(`
        User Book Added Successfully`)
      } else {
        cconsole.log(`
        Not able to give out book to user`);
      }
    });
  };
};

module.exports = { getUser, updateUser, writeToUser };
