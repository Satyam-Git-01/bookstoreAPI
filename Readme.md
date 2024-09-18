# BookstoreAPI

## Overview

This project is a simplified bookstore API that allows users to browse books, add books to a cart, and place orders. The system also support user authentication and authorization.

## Table of Contents

- [Installation](#installation)
- [Packages/library I have Used](#packages-used)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
  - [Auth APIs](#authentication-api)
  - [Books APIs](#books-api)
  - [Cart APIs](#cart-api)
  - [Orders APIs](#orders-api)
- [Postman Collection](#postman-collection)

# Installation

### Steps

1. **Clone the Repository**

```bash
git clone https://github.com/Satyam-Git-01/bookstoreAPI.git
```

2. **Install Dependencies**

```bash
npm install
```

3. **Set Up the Database**

   1. Create a database in MySQL Workbench using this command

   ```
   create database bookstore
   ```

4. **Create Environment Variables**

   Create a .env file in the root directory and add the following:

```bash
PORT_NUMBER=6565
DB_SCHEMA=bookstore
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
JWT_TOKEN=myjwttoken

```

DB_SCHEMA in .env file should be your database name which we earlier created.

5.  **Start the Server**

```bash Copy code
npm start
```

The server will run on http://localhost:6565.

# Packages Used

1. `Express` - To create an express server
2. `bcrypt `- To hash the user's password
3. `body-parser`- To parse the request body
4. `dotenv` - To get access to environment variables
5. `jsonwebtoken` - To authenticate and auhtorize
6. `mysql2` - To connect to MySQL Server
7. `Sequelize`- A ORM library to write SQL query in efficeint manner.
8. `Validator` - To sanitize the request body and maintain validation

# Environment Variables

- `PORT`: 6565
- `DB_NAME`: bookstore
- `DB_USER`: root
- `DB_PASSWORD`: your_password
- `DB_HOST`: localhost
- `JWT_SECRET`: your_secret_key

## Database Schema

The schema includes the following tables:

- `Users`
- `Books`
- `Carts`
- `CartItems`
- `Orders`
- `OrderItems`

Please Refer to the `SQL Queries.sql` and `Schema.jpg` files in this repository for the complete database code and understanding.


Note I am using Sequelize that will automatically create the tables as needed. Also, I have written sql queries you can check them.

# API Endpoints

## Authentication API

1. **Register a User**

   **Method** : POST  
   **Endpoint** : `/api/auth/register`  
   **Headers** : None  
   **Body** : Given JSON

```json
{
  "username": "user",
  "email":"usermeail@gmail.com"
  "password": "password@123"
}
```

2. **Login a User**

   **Method** : POST  
   **Endpoint** : `/api/auth/login`  
   **Headers** : None  
   **Body** :

```json
{
  "email": "user123@gmail.com",
  "password": "password123"
}
```

**Return JWT TOKEN AFTER SUCCESFUL LOGIN**

## Books API

1. **GET All Books**

   **Method** : GET  
   **Endpoint** : `/api/books`  
   **Headers** : None  
   **Body** : None

2. **Get a Specific Book Detail by Id**

   **Method** : GET  
   **Endpoint** : `/api/books/:id`  
   **Headers** : None  
   **Body** : None

   **Params** : A Valid Number eg. 1

## Cart API

1. **Get cart details for the authenticated user**

   **Method** : GET  
   **Endpoint**: `/api/cart`  
   **Headers**: `Authorization:<token>`  
   **Body**: None

2. **Add a Book to the Cart (Only by Authorized User)**

   **Method** : POST  
   **Endpoint**: `/api/cart`  
   **Headers**: `Authorization:<token>`  
   **Body**: Given JSON

```json
{
  "bookId": 7,
  "quantity": 5
}
```

3. **Remove a Book from the Cart**

   **Method** : DELETE  
   **Endpoint** : `/api/cart/:itemId`  
   **Headers** : `Authorization:<token>`  
   **Body** :None  
   **Params** : A valid Number eg. 2

## Orders API

1. **Place/Create an Order**  
   **Method** : POST  
   **Endpoint**: ` /api/orders`  
   **Headers**: `Authorization:<token>`  
   **Body**: None

2. **Get Order History of Authenticated/logged User**

   **Method** : GET  
   **Endpoint**: `/api/orders`  
    **Headers** : `Authorization:<token>`  
    **Body**: None

3. **Get Order Details**

   **Method** : GET  
   **Endpoint**: `/api/orders/:id`  
    **Headers** : `Authorization:<token>`  
    **Body**: None     
   **Params**: A valid orderId of a user


# Postman collection

`URL` - 

`file`- BookstoreAPI.postman_collection.json in root directory
