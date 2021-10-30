const fileUtil = require("./fileUtil");

const getUser = (userid, bookid) => {
  console.log(userid)
  if (userid && bookid) {
    fileUtil.read("users", userid, (err, data) => {
      console.log(`
      getUser`, data);
      if (!err && data) {
        console.log(
          `
        Before filtering`,
          data.books
        );
        let userBooks = data.books 
        data.books = userBooks.filter((book) => book.bookId !== bookid);
        console.log("After filtering", data.books);
        updateUser(data, userid);
      } else {
        console.log("Could not update User");
      }
    });
  } else {
    console.log("user not found")
  }
};

const updateUser = (userObject, userId) => {
  if (userObject && userId) {
    fileUtil.update("users", userId, userObject, (err) => {
      console.log(`
      updateUser`);
      if (!err) {
        console.log("User has been Updated");
      } else {
        console.log("Error updating user");
      }
    });
  } else {
    console.log("user not found")
  }
};

const writeToUser = (data, borrowedBookData) => {
  const userid = data.query.userid;

  fileUtil.read("users", userid, (err, userData) => {
    console.log(`
      WriteToUser`);
    if (!err && userData) {
      updateUser(userData, borrowedBookData);
    } else {
      console.log("Error reading user");
    }
  });

  const updateUser = (userData, borrowedBookData) => {
    const userBookArray = userData.books;
    userBookArray.push(borrowedBookData);
    console.log("userBookArray", userBookArray);

    const mUserData = {
      firstname: userData.firstname,
      lastname: userData.lastname,
      phoneNo: userData.phoneNo,
      email: userData.email,
      books: userBookArray,
    };

    fileUtil.update("users", userid, mUserData, (err) => {
      if (!err) {
        console.log(`
        User Book Added Successfully`);
      } else {
        cconsole.log(`
        Not able to give out book to user`);
      }
    });
  };
};

module.exports = { getUser, updateUser, writeToUser };
