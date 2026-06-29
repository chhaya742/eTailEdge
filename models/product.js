const knex = require("../database-config");

knex.schema.hasTable("product").then(async (exists) => {
    if (!exists) {
        await knex.schema.createTable("product", (table) => {
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
        });

        console.log("✅ Product table created.");

        await knex("product").insert([
            {
                title: "Classic Black T-Shirt",
                slug: "classic-black-tshirt",
                description: "Premium cotton black t-shirt.",
                price: 699,
                category: "tshirts",
                size: "M",
                color: "Black",
                availableQty: 50,
                image: "/tshirts/tshirt1.jpg",
            },
            {
                title: "Oversized White T-Shirt",
                slug: "oversized-white-tshirt",
                description: "Oversized white cotton t-shirt.",
                price: 799,
                category: "tshirts",
                size: "L",
                color: "White",
                availableQty: 35,
                image: "/tshirts/tshirt2.jpg",
            },
            {
                title: "Grey Hoodie",
                slug: "grey-hoodie",
                description: "Warm fleece hoodie.",
                price: 1499,
                category: "hoodies",
                size: "XL",
                color: "Grey",
                availableQty: 20,
                image: "/hoodies/hoodie1.jpg",
            },
            {
                title: "Coffee Mug",
                slug: "coffee-mug",
                description: "Ceramic printed mug.",
                price: 399,
                category: "mugs",
                size: "Standard",
                color: "White",
                availableQty: 100,
                image: "/mugs/mug1.jpg",
            },
            {
                title: "Laptop Sticker",
                slug: "laptop-sticker",
                description: "Waterproof vinyl sticker.",
                price: 149,
                category: "stickers",
                size: "Small",
                color: "Multicolor",
                availableQty: 200,
                image: "/stickers/sticker1.jpg",
            },
            {
                title: "Gift Box",
                slug: "gift-box",
                description: "Premium gift packaging.",
                price: 299,
                category: "gift",
                size: "Medium",
                color: "Pink",
                availableQty: 40,
                image: "/gift/gift1.jpg",
            }
        ]);

        console.log("✅ Dummy products inserted.");
    } else {
        console.log("Product table already exists.");
    }
});

module.exports = knex;