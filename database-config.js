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
            username: "8i89omx0p5ihdh7st9xv",
            password: "pscale_pw_uxQONOyFx8snClOLWBErXjUUf269Py8wHV2j02lBJeK"
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