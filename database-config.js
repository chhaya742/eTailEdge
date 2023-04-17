import "dotenv"
const mode = "test"
let options;
if (mode == "live") {
    options = {
        client: 'mysql',
        connection: {
            ssl: {},
            database: "codeswear",
            username: "p8inah4e72e66fdtypz9",
            host: "aws.connect.psdb.cloud",
            password: "pscale_pw_HOVtwByCcR377FUoN8ye7ORk8iBfkGfUOepw99boJIm"
        }
    }
} else {
    options = {
        client: 'mysql',
        connection: {
            host: 'localhost',
            port: "3306",
            user: 'root',
            password: 'Chhaya@123',
            database: 'codeswear'
        }
    }
}

const knex = require('knex')(options);
module.exports = knex;