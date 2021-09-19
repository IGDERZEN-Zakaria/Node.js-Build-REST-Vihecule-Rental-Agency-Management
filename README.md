# Node.js-Build-REST-Vihecule-Rental-Agency-Management
[FreeCourseSite.com] Udemy - Node.js The Complete Guide to Build RESTful APIs - Mosh Hamedani




to set jwtPrivateKey :

$ export vidly_jwtPrivateKey=mySecureKey 

$ node index.js  


Try this request to get the header from the token 

"  http://localhost:3000/api/users  "

== bodyRequest ==

{
  "_id": "614789436fd7b5130b94b7d5",
  "name": "Zacko",
  "email": "zakaria.igderzen@gmail.com"
}

== bodyRequest ==


get the token fron the header response 

x-auth-token =  tchiwiwi

then use it to do the rest of requests :

http://localhost:3000/api/vehicles
http://localhost:3000/api/types
http://localhost:3000/api/rentals
http://localhost:3000/api/customers








