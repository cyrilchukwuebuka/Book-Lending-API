# Book-Lending-API

An Api that allows a registered user to borrow book  
from the library using the user issued ID

### Technologies used
* Raw Http (used to create and get the server up and running)

### Functionalities
* Book Route for:
 * Creating and Adding new book to the library when the url(/books) is visited with a POST method
 * Updating already existing book when (/books?params) is visited with PUT method
 * Reading(fetching) a particular book from the library when (/books?param) is visited with the GET method
 * Deleting a particular book from the library when (/books?params) is visited with the DELETE method

* User Route for:
 * Registering new user in the library when the url(/users) is visited with a POST method
 * Updating already existing user when (/users?params) is visited with PUT method
 * Reading(fetching) a particular user from the library when (/users?param) is visited with the GET method
 * Deleting a particular user from the library when (/users?params) is visited with the DELETE method
