# Api - Fashion Moda

Api online: [https://api-node-fashion.herokuapp.com/](api-node-fashion)

Postman collection: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/cae99eaf4a28b2367c4c)

#### Server
* Heroku > Hosting
* Mlab + Atlas > Cloud DB

#### Restful API
* NodeJS - express
* MongoDB

#### Dependencies
* bcryptjs `encrypt password`
* cors `enabled cors http`
* google-auth-library `auth account google`
* jade `render views`
* jsonwebtoken `generated token`
* mongoose `connect db - mongodb`

## Getting Started
```
npm install
```

#### Config DB

* Config connection BD in `config/database.js`
* Set url `mongodb://localhost/fashion-db`

#### Config Server

* Config PORT in `/src/index.js`

#### Deploy Api
```
 node src/index.js
```
  
  Run proyect in Node start on port(s): 3002
  
  Run as http://localhost:3002/

## API routes 
  ###### AUTH
  __sign in__
  * url: `http://localhost:3002/api/v1/auth/signin`, method: [POST]
  
  __sign up__
  * url: `http://localhost:3002/api/v1/auth/signup`, method: [POST]

  __login with google__
  * url: `http://localhost:3002/api/v1/auth/googlelogin`, method: [POST]

---
  ###### USERS
  __get list__
  * url: `http://localhost:3002/api/v1/users/`, method: [GET]

  __get by ID__
  * url: `http://localhost:3002/api/v1/users/:id`, method: [GET]

  __create__
  * url: `http://localhost:3002/api/v1/users/`, method: [POST]

  __update__
  * url: `http://localhost:3002/api/v1/users/`, method: [PUT]

  __delete__
  * url: `http://localhost:3002/api/v1/users/`, method: [DELETE]

---
###### CATEGORIES
  __get list__
  * url: `http://localhost:3002/api/v1/categories/`, method: [GET]

  __get by ID__
  * url: `http://localhost:3002/api/v1/categories/:id`, method: [GET]

  __create__
  * url: `http://localhost:3002/api/v1/categories/`, method: [POST]

  __update__
  * url: `http://localhost:3002/api/v1/categories/`, method: [PUT]

  __delete__
  * url: `http://localhost:3002/api/v1/categories/`, method: [DELETE]
