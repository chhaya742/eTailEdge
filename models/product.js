const knex = require("../database-config");

knex.schema.hasTable("product").then(function (exists) {
    if (!exists) {
        return knex.schema
            .createTable("product", (table) => {
                table.increments("id").primary();

                table.string("title").notNullable();
                table.string("slug").unique().notNullable();

                table.text("description");

                table.integer("price").notNullable();

                table.string("category").notNullable();

                table.string("size");
                table.string("color");

                table.integer("availableQty").defaultTo(0);

                table.string("image");

                table.timestamps(true, true);
            })
            .then(() => {
                console.log("Product table created successfully.");
            })
            .catch((err) => console.log(err));
    } else {
        console.log("Product table already exists.");
    }
});

module.exports = knex;