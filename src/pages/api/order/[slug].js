import knex from '../../../../database-config'
import {auth} from '../auth'
import { v4 as uuidv4 } from 'uuid';
var jwt = require('jsonwebtoken');
const saltRounds = 10;
export default async function handler(req, res) {
    const slug = req.query.slug
    let orderid =Math.floor(10000000 + Math.random() * 90000000);
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
            let orderId=await knex("orders").select("orderId").where({id:orders[0]})
            res.status(200).json({ status: true, message: "order created  successfully", data: orderId })
        } catch (error) {
            console.log(error);
            res.status(200).json({ status: false, message: error.sqlMessage, data: [] })
        }
    }
    if (slug == "get-order") {
        console.log(auth);
        let products = [];
        try {
            const data = jwt.verify(req.body.token, process.env.NEXT_PUBLIC_jwtprivateKey)
            let orders = await knex("orders").select("*").where({ userid: data.user.id })
            orders = JSON.parse(JSON.stringify(orders))
           
            for (let i of orders) {
                const product = await knex("product").select("*").where({ id: i.productid })
                products.push(Object.values(JSON.parse(JSON.stringify(product)))[0]);
            }
      
            res.status(200).json({ status: true, message: "orders fetch  successfully", data: { products:products, orders:orders } })
        } catch (error) {
            console.log(error);
            res.status(200).json({ status: false, message: error.sqlMessage, data: [] })
        }
    }
}