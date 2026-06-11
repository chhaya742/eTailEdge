import "dotenv"
const mode = "test"
let options;
if (mode == "live") {
    options = {
        client: 'mysql',
        connection: {
            ssl: {},
            database: process.env.LOCAL_DATABASE_NAME,
            username: process.env.LOCAL_DATABASE_USERNAME,
            host: process.env.LOCAL_DATABASE_HOST,
            password: process.env.LOCAL_DATABASE_PASSWORD
        }
    }
} else {
    options = {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        }
    }
}

const knex = require('knex')(options);
module.exports = knex;