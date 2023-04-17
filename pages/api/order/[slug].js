import knex from '../../../database-config'
import { auth } from '../auth'
import { v4 as uuidv4 } from 'uuid';
var jwt = require('jsonwebtoken');
const saltRounds = 10;
export default async function handler(req, res) {
    const paginateTotal = async (searchFrom, search, status) => {
        let results = knex("orders")
        let total = 0
        if (status != undefined && status != "") {
            results = results.where("status", status)
        }
        // results.whereNot('status', `3`)
        results = results.where((query) => {
            if (search) {
                searchFrom.map(val => {
                    query.orWhereILike(val, `%${search}%`)
                })
            }
        })
        total = await results.count("id as total").first()
        return total
    }
    const paginate = (limit, offset, searchFrom, status, sort, search, order) => {
        let rows = knex("orders")
        if (status != undefined && status != "") {
            rows.where('status', `${status}`)
        }

        rows = rows.where((query) => {
            if (search) {
                searchFrom.map(val => {
                    query.orWhereILike(val, `%${search}%`)
                })
            }
        })
        rows = rows.orderBy(sort, order).limit(limit).offset(offset)

        return rows
    }

    const slug = req.query.slug
    let orderid = Math.floor(10000000 + Math.random() * 90000000);

    if (slug == "order") {

        const addressData = {
            userid: req.body.userid,
            address: req.body.address,
            state: req.body.state,
            city: req.body.city,
            pin: req.body.pin
        }

        try {
            let address = await knex("address").insert(addressData)
            const order = {
                orderId: orderid,
                userid: req.body.userid,
                productid: req.body.productid,
                address: address[0],
                amount: req.body.amount,
            }
            let orders = await knex("orders").insert(order)
            let orderId = await knex("orders").select("orderId").where({ id: orders[0] })
            res.status(200).json({ status: true, message: "order created  successfully", data: orderId })
        } catch (error) {
            console.log(error);
            res.status(200).json({ status: false, message: error.sqlMessage, data: [] })
        }
    }
    if (slug == "orders") {
        try {
            let { offset = 0, limit = 10, order = "asc", sort = "id", search, status } = req.body;
            let searchFrom = [
                "orderId",
                "status"
            ]
            const total = await paginateTotal(searchFrom, search, status)

            const rows = await paginate(limit, offset, searchFrom, status, sort, search, order)
            // rows = rows.map(row => {
            //     row.image = constants.getStaticUrl(row.image)
            //     return row
            // })
            let data_rows = [];
            if (order === "asc") {

                let sr = total.total - (limit * offset)
                await rows.forEach(row => {
                    row.sr = sr;
                    data_rows.push(row);
                    sr--;
                });
            } else {
                let sr = offset + 1;
                await rows.forEach(row => {
                    row.sr = sr;
                    data_rows.push(row);
                    sr++;
                });
            }
            console.log("data_rows",data_rows);
            res.status(200).json({
                error: false,
                message: "orders received successfully.",
                data: {
                    rows: data_rows,
                    total
                }
            });
            res.end()
        } catch (e) {
            // console.log(e)
            res.json({ error: true, message: "Something went wrong", data: e })
        }
        res.end()                              

    }

    if (slug == "get-order") {
        let { offset = 0, limit = 10, order = "asc", sort = "id", search, token } = req.body;
        ;
        const data = jwt.verify(token, process.env.NEXT_PUBLIC_jwtprivateKey)
        let results = knex("orders")
        // console.log(search);
        results = results.where(function () {
            if (search != undefined && search != "") {
                // this.orWhereILike("id ", `%${search}%`)
                this.orWhereILike("orderId", `%${search}%`)
                // this.orWhereILike("status", `%${search}%`)
            }
        })

        let total = await knex.count("id").from('orders').first();

        let rows = knex("orders")

        rows = rows.where(function () {
            if (search != undefined && search != "") {
                this.orWhereILike("orderId", `%${search}%`)

                // this.orWhereILike("status", `%${search}%`)
                this.orWhereILike("id", `%${search}%`)
            }
        })


        if (order === null || order === "") {
            order = "id"
        }
        rows = await rows.orderBy(sort, order).limit(limit).offset(offset)


        let data_rows = [];
        let products = [];
        if (order === "desc") {
            let sr = offset + 1;
            await rows.forEach(row => {
                row.sr = sr;
                delete row.password;
                data_rows.push(row);
                sr++;
            });
        } else {
            let sr = Object.values(total)[0] - (limit * offset)
            await rows.forEach(row => {
                row.sr = sr;
                delete row.password;
                data_rows.push(row);
                sr--;
            });
        }
        // console.log(data_rows);
        for (let i of data_rows) {
            const product = await knex("product").select("*").where({ id: i.productid })
            products.push(Object.values(JSON.parse(JSON.stringify(product)))[0]);
        }
        total = (Object.values(total)[0] != undefined) ? Object.values(total)[0] : 0;


        res.status(200).json({
            status: true,
            message: "Orders retrieved successfully.",
            total: total,
            data: { rows: data_rows, products: products }
        });



        // console.log(auth);
        //     let products = [];
        //     try {
        //         const data = jwt.verify(req.body.token, process.env.NEXT_PUBLIC_jwtprivateKey)
        //         let orders = await knex("orders").select("*").where({ userid: data.user.id })
        //         orders = JSON.parse(JSON.stringify(orders))

        // for (let i of orders) {
        //     const product = await knex("product").select("*").where({ id: i.productid })
        //     products.push(Object.values(JSON.parse(JSON.stringify(product)))[0]);
        // }

        //         res.status(200).json({ status: true, message: "orders fetch  successfully", data: { products: products, orders: orders } })
        //     } catch (error) {
        //         console.log(error);
        //         res.status(200).json({ status: false, message: error.sqlMessage, data: [] })
        //     }
    }

    
}