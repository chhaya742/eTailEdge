import "dotenv"
const mode = "test"
let options;
if (mode == "live") {
    options = {
        client: 'mysql',
        connection: {
            ssl: {},
            host: "aws.connect.psdb.cloud",
            port: "3306",
            database: "codeswear",
            username: "0jz77wua1dynoyke5pz1",
            password: "pscale_pw_MyCSY523ifsrnvonahA2oBNk0ku3RRy5UE0gFFB0bFw"
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