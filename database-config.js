const options = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'Chhaya@123',
        database: 'codeswear'
    }
}

const knex = require('knex')(options);


module.exports=knex