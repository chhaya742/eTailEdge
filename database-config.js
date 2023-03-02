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
        host: process.env.NEXT_PUBLIC_DB_HOST,
        port: process.env.NEXT_PUBLIC_DB_PORT,
        user: process.env.NEXT_PUBLIC_DB_USERNAME,
        password: process.env.NEXT_PUBLIC_DB_PASSWORD,
        database: process.env.NEXT_PUBLIC_DB_DATABASE,
    }
});




