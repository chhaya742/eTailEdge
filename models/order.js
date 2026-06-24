const knex = require("../database-config");

knex.schema.hasTable("orders").then(function (exists) {
    if (!exists) {
        return knex.schema
            .createTable("orders", (table) => {
                table.increments("id").primary();

                table
                    .integer("userid")
                    .unsigned()
                    .notNullable();

                table
                    .foreign("userid")
                    .references("id")
                    .inTable("user")
                    .onDelete("CASCADE");

                table.json("products").notNullable();

                table.integer("amount").notNullable();

                table.string("status").defaultTo("Pending");

                table.string("address").notNullable();

                table.timestamps(true, true);
            })
            .then(() => {
                console.log("Orders table created successfully.");
            })
            .catch((err) => console.log(err));
    } else {
        console.log("Orders table already exists.");
    }
});

module.exports = knex;