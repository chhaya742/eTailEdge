const knex = require("../database-config")

knex.schema.hasTable('order').then(function(exists) {
    if (!exists) {
        return knex.schema.createTable("order",(table)=>{
            table.increments('id')
            table.foreign('userid').references('user.id').notNullable();
            table.integer("products").notNullable()
            table.integer('amount')
            table.string('status')
        })
    }
});


// knex.schema.hasTable('order').then(function(exists) {
//     if (!exists) {
//         return knex.schema.createTable('order', (table) => {
//             table.increments('id');
//             table.integer("products");
//             table.integer('userid');
//             table.string('address');
//             table.integer('amount');
//             table.string('status');
//         }).then(()=>{console.log("table created")
//         }).catch((err)=>{
//             console.log(err)
//         })
//     }else{
//         console.log("table already created")
//     }
// });

module.exports=knex