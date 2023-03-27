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
        user:"n0pcdcbvlv11kg1867cy",
        password:"pscale_pw_rx62M5gvFWwSLd1kEiOEyZYEbSlmpXEXKIGdGK7fhzP",
        database: "codeswear",
    }
});






