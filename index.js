/**
 * Entry file to out application
 */

const http = require("http");
const url = require("url");
const { StringDecoder } = require("string_decoder");
const routeHandler = require("./lib/routehandler");

const httpServer = http.createServer((req, res) => {

  //parse the incoming url
  const parsedurl = url.parse(req.url, true);

  //get the path name
  const pathname = parsedurl.pathname;

  const trimedPath = pathname.replace(/^\/+|\/+$/g, "");

  //get the Http Method
  const method = req.method.toLowerCase();
  //get the query string
  const queryStringObj = parsedurl.query;
  console.log(queryStringObj)
  //get the request headers
  const headers = req.headers;
  console.log(headers)

  const decoder = new StringDecoder("utf-8");
  var buffer = "";
  req.on("data", (data) => {
    buffer += decoder.write(data);
  });

  req.on("end", () => {
    buffer += decoder.end();

    const parsedPayload = buffer !== "" ? JSON.parse(buffer) : {};

    const data = {
      trimedPath: trimedPath,
      query: queryStringObj,
      method: method,
      headers: headers,
      payload: parsedPayload,
    };

    const chosenHandler =
      typeof router[trimedPath] !== "undefined"
        ? router[trimedPath]
        : router.notfound;
    //use the chosen handler to handle the request
    chosenHandler(data, (statusCode, result) => {
        console.log(data.query.bookname)
      statusCode = typeof statusCode === "number" ? statusCode : 200;
      result = typeof result === "object" ? result : {};

      const responseObj = JSON.stringify(result);

      res.setHeader("Content-type", "application/json");
      res.writeHead(statusCode);

      res.write(responseObj);
      res.end();

      console.log(
        `the url visited was, ${trimedPath} and the method is ${method}`
      );
    });
  });
});

//start listening on port 8080
httpServer.listen(8080, () => {
  console.log("server is listening on port 8080");
});

const router = {
  ping: routeHandler.ping,
  books: routeHandler._books,
  users: routeHandler._users,
  borrow: routeHandler._borrow,
  notfound: routeHandler.notfound,
};

/**
 * Admin Function
 * Registering a user will require us creating another file
 * where we store the users we registered with there names and password
 * and the books collected from the library
 *
 * User Function
 * Requests for a book from the BOOKSHELF
 *
 *
 *
 * create three routes
 * 1. for creating a user  url = /createuser
 * 2. for user to borrow a book   url = /borrowbook
 * 3. for user to return a book    url = /returnbook
 *
 *
 * Returning a borrowed book should use a post request
 */

