-- 1. Create bookstore database --
create database bookstore;

-- 2 Use bookstore database--
use bookstore;

-- create users table
CREATE TABLE `tbl_users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`)
);

-- Create books table--
CREATE TABLE `tbl_books` (
  `bookId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  PRIMARY KEY (`bookId`)
);

-- Insert Dummy Data in tbl_books--
INSERT INTO tbl_books (name, author, price) 
VALUES 
('The Great Gatsby', 'F. Scott Fitzgerald', 10.99),
('1984', 'George Orwell', 8.99),
('To Kill a Mockingbird', 'Harper Lee', 12.50),
('Pride and Prejudice', 'Jane Austen', 7.99),
('The Catcher in the Rye', 'J.D. Salinger', 9.99),
('Moby-Dick', 'Herman Melville', 15.00),
('War and Peace', 'Leo Tolstoy', 18.99),
('The Odyssey', 'Homer', 13.99),
('Ulysses', 'James Joyce', 14.50),
('Crime and Punishment', 'Fyodor Dostoevsky', 11.50);

-- create tbl_carts --
CREATE TABLE `tbl_carts` (
  `cartId` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`cartId`),
  FOREIGN KEY (`userId`) REFERENCES `tbl_users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE
);

-- create tbl_cartItems --
CREATE TABLE `tbl_cartitems` (
  `cartItemsId` int NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT '1',
  `cartId` int DEFAULT NULL,
  `bookId` int DEFAULT NULL,
  PRIMARY KEY (`cartItemsId`),
  FOREIGN KEY (`cartId`) REFERENCES `tbl_carts` (`cartId`) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (`bookId`) REFERENCES `tbl_books` (`bookId`) ON DELETE SET NULL ON UPDATE CASCADE
);

-- create tbl_orders --
CREATE TABLE `tbl_orders` (
  `orderId` int NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT 'PENDING',
  `totalPrice` float DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`orderId`),
  FOREIGN KEY (`userId`) REFERENCES `tbl_users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE
);

-- create tbl_orderitems --
CREATE TABLE `tbl_orderitems` (
  `orderItemsId` int NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT '1',
  `price` float DEFAULT NULL,
  `orderId` int DEFAULT NULL,
  `bookId` int DEFAULT NULL,
  PRIMARY KEY (`orderItemsId`),
  FOREIGN KEY (`orderId`) REFERENCES `tbl_orders` (`orderId`) ON DELETE SET NULL ON UPDATE CASCADE,
   FOREIGN KEY (`bookId`) REFERENCES `tbl_books` (`bookId`) ON DELETE SET NULL ON UPDATE CASCADE
);



