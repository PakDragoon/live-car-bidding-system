const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.error('Database connection error:', err));

module.exports = sequelize;


// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(50) UNIQUE NOT NULL,
//     email VARCHAR(100) UNIQUE NOT NULL
// );

// CREATE TABLE auctions (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     description TEXT,
//     starting_price DECIMAL NOT NULL,
//     current_price DECIMAL,
//     end_time TIMESTAMP NOT NULL
// );

// CREATE TABLE bids (
//     id SERIAL PRIMARY KEY,
//     auction_id INT NOT NULL,
//     user_id INT NOT NULL,
//     amount DECIMAL NOT NULL,
//     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (auction_id) REFERENCES auctions(id),
//     FOREIGN KEY (user_id) REFERENCES users(id)
// );
