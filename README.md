# Book-Lending-API

An Api that allows a registered user to borrow book  
from the library using the user issued ID

### Technologies used
* Http (used to create and get the server up and running)
* url
* string_decoder

### Functionalities
* Book Route for:
  * Creating and Adding new book to the library when the url **(/books)** is visited with a POST method
  * Updating already existing book when **(/books?params)** is visited with PUT method
  * Reading(fetching) a particular book from the library when **(/books?bookIdparam)** is visited with the GET method
  * Deleting a particular book from the library when **(/books?params)** is visited with the DELETE method

* User Route for:
  * Registering new user in the library when the url **(/users)** is visited with a POST method
  * Updating already existing user when **(/users?params)** is visited with PUT method
  * Reading(fetching) a particular user from the library when **(/users?userIdparam)** is visited with the GET method
  * Deleting a particular user from the library when **(/users?params)** is visited with the DELETE method

* Borrow Route for:
  * Borrowing book from the Library and adding it to the BorrowedBook Record  
    while also adding it to the list of books in the user's custody when **(/borrow?bookidparam)** is visited
  * Returning book to the Library while removing it from the user's book and deleting it from the Borrowed book record  
    when **(/borrow?useridparam&borrowedBookidparam)** is visited
