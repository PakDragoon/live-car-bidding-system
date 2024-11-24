const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);

sequelize
  .authenticate()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.error('Database connection error:', err));

module.exports = sequelize;


// CREATE TABLE users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// );

// CREATE TABLE auctions (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     description TEXT NOT NULL,
//     starting_price DECIMAL(10, 2) NOT NULL,
//     current_price DECIMAL(10, 2) DEFAULT NULL,
//     start_time DATETIME NOT NULL,
//     end_time DATETIME NOT NULL,
//     status ENUM('OPEN', 'CLOSED', 'CANCELLED') DEFAULT 'OPEN',
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     user_id INT NOT NULL,
//     FOREIGN KEY (user_id) REFERENCES users(id)
// );

// CREATE TABLE bids (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     bid_amount DECIMAL(10, 2) NOT NULL,
//     bid_time DATETIME DEFAULT CURRENT_TIMESTAMP,
//     user_id INT NOT NULL,
//     auction_id INT NOT NULL,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES users(id),
//     FOREIGN KEY (auction_id) REFERENCES auctions(id)
// );
