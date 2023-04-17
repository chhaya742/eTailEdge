import "dotenv"
const mode = "test"
let options;
if (mode == "live") {
    options = {
        client: 'mysql',
        connection: {
            ssl: {},
            host: "",
            port: "3306",
            database: "codeswear",
            username: "",
            password: ""
        }
    }
} else {
    options = {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'Chhaya@123',
            database: 'codeswear'
        }
    }
}

const knex = require('knex')(options);
module.exports = knex;