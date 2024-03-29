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
    const paginate = (limit, offset, searchFrom, status, sort, search, order,userid) => {
        let rows = knex("orders")
        if (status != undefined && status != "") {
            rows.where('status', `${status}`)
            rows.where('userid', `${userid}`)
        }
        if (userid != undefined && userid != "") {
      
            rows.where('userid', `${userid}`)
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
        console.log("*********************#################", addressData);
        try {
            let address = await knex("address").insert(addressData)
            const order = {
                orderId: orderid,
                userid: req.body.userid,
                productid: req.body.productid,
                address: address[0],
                amount: req.body.amount,
                status: "Pending"
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
            let products = [];
            let address = [];
            let user = [];
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
            for (let i of data_rows) {
                const product = await knex("product").select("*").where({ id: i.productid })
                products.push(Object.values(JSON.parse(JSON.stringify(product)))[0]);
            }
            for (let i of data_rows) {
                const addressdata = await knex("address").select("*").where({ id: i.address })
                address.push(Object.values(JSON.parse(JSON.stringify(addressdata)))[0]);
            }
            for (let i of data_rows) {
                const userdata = await knex("user").select("*").where({ id: i.userid })
                // console.log("userdata", Object.values(JSON.parse(JSON.stringify(userdata)))[0]);
                user.push(Object.values(JSON.parse(JSON.stringify(userdata)))[0]);
            }
         
            res.status(200).json({
                error: false,
                message: "orders received successfully.",
                data: {
                    total,
                    data: { rows: data_rows, products: products, address:address, user:user }
                }
            });
            res.end()
        } catch (e) {
            // console.log(e)
            res.json({ error: true, message: "Something went wrong", data: e })
        }
        res.end()

    }

    if (slug == "get-order1111") {
        let { offset, limit = 10, order = "asc", sort = "id", search, token } = req.params;

        // const data = jwt.verify(token, process.env.NEXT_PUBLIC_jwtprivateKey)

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

        console.log("row", rows);
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

        for (let i of data_rows) {
            const product = await knex("product").select("*").where({ id: i.productid })
            products.push(Object.values(JSON.parse(JSON.stringify(product)))[0]);
        }
        total = (Object.values(total)[0] != undefined) ? Object.values(total)[0] : 0;

        console.log("data_rows", data_rows);
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
     if (slug == "get-order") {
        try {
            let { offset = 0, limit = 10, order = "asc", sort = "id", search, status ,token} = req.body;
            const data = jwt.verify(token, process.env.NEXT_PUBLIC_jwtprivateKey)
            let searchFrom = [
                "orderId",
                "status"
            ]
            console.log(data.user.id);
            const total = await paginateTotal(searchFrom, search, status)

            const rows = await paginate(limit, offset, searchFrom, status, sort, search, order,data?.user.id)
            // rows = rows.map(row => {
            //     row.image = constants.getStaticUrl(row.image)
            //     return row
            // })
            let data_rows = [];
            let products = [];
            let address = [];
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
            for (let i of data_rows) {
                const product = await knex("product").select("*").where({ id: i.productid })
                products.push(Object.values(JSON.parse(JSON.stringify(product)))[0]);
            }
            for (let i of data_rows) {
                const addressdata = await knex("address").select("*").where({ id: i.address })
                address.push(Object.values(JSON.parse(JSON.stringify(addressdata)))[0]);
            }
         
            res.status(200).json({
                error: false,
                message: "orders received successfully.",
                data: {
                    total,
                    data: { rows: data_rows, products: products, address:address}
                }
            });
            res.end()
        } catch (e) {
            // console.log(e)
            res.json({ error: true, message: "Something went wrong", data: e })
        }
        res.end()

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
    if (slug == "order-update") {
        const inputData = req.body
        const id = req.body.id
        const addressid=req.body.addressid

        const addressData = {
            userid: req.body.userid,
            address: req.body.address,
            state: req.body.state,
            city: req.body.city,
            pin: req.body.pin
        }
       
        const order = {
            orderId: req.body.orderid,
            userid: req.body.userid,
            productid: req.body.productid,
            address:addressid,
            amount: req.body.amount,
            status: req.body.status
        }
       
        try {
            let address = await knex("address").update(addressData).where({ "id": addressid })
            const data = await knex("orders").update(order).where({ "id": id })
            res.status(200).json({ status: true, message: "order update successfully ", data: data })
        } catch (error) {
            res.status(200).json({ status: false, message: error.sqlMessage, data: [] })
        }
    }

    if (slug == "delete-order") {
        // console.log("chhaya");
        const id = req.body.id
        // console.log(id);
        try {
            const data = await knex("orders").delete().where({ "id": id })
            res.status(200).json({ status: true, message: "order delete successfully ", data: data })
        } catch (error) {
            console.log(error);
            res.status(200).json({ status: false, message: error.sqlMessage, data: [] })
        }
    }

}