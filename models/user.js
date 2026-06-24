const knex = require("../database-config");

knex.schema.hasTable("user").then(function (exists) {
    if (!exists) {
        return knex.schema
            .createTable("user", (table) => {
                table.increments("id").primary();

                table.string("name").notNullable();
                table.string("email").unique().notNullable();
                table.string("password").notNullable();

                table.string("phone");
                table.string("address");
                table.string("city");
                table.string("state");
                table.string("pincode");

                table.boolean("isAdmin").defaultTo(false);

                table.timestamps(true, true);
            })
            .then(() => {
                console.log("User table created successfully.");
            })
            .catch((err) => console.log(err));
    } else {
        console.log("User table already exists.");
    }
});

module.exports = knex;