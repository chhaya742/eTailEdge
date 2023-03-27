// import "dotenv"
// const options = {
//     client: 'mysql',
//     connection: {
//         host: "localhost",
//         user: "root",
//         password: "Chhaya@123",
//         database: "codeswear"
//     }
// }
// const knex = require('knex')(options);

// module.exports=knex



import "dotenv"
module.exports = require('knex')({
    client: 'mysql',
    connection: {
        ssl: {},
        host:"us-east.connect.psdb.cloud",
        port: "3306",
        database: "codeswear",
        username: "8368k9qmmypbawu9v799",
        host: "us-east.connect.psdb.cloud",
        password: "pscale_pw_r6ZiyTbbXZrcXrzHNkQQZ8199g8Y0MJhKN7mylkvWHp"
    }
});






