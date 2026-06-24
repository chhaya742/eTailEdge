require('dotenv').config();
const mode = "test"
let options;
if (mode == "live") {
    options = {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: {
                rejectUnauthorized: false
            }
        }
    }
} else {
    options = {
        client: "mysql2",
        connection: {
            host: process.env.LOCAL_DATABASE_HOST,
            user: process.env.LOCAL_DATABASE_USERNAME,
            password: process.env.LOCAL_DATABASE_PASSWORD,
            database: process.env.LOCAL_DATABASE_NAME
        }
    }
}

const knex = require('knex')(options);
module.exports = knex;