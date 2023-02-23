import knex from '../../../../database-config'
var jsonwebtoken = require('jsonwebtoken');

const saltRounds = 10;
export default async function handler(req, res) {
    const slug = req.query.slug
    if (slug == "order") {
        const address = {
            userid: req.body.userid,
            address: req.body.address,
            state: req.body.state,
            city: req.body.city,
            pin: req.body.pin
        }
        console.log(req.body.productid);
        const order = {
            userid: req.body.userid,
            productid: req.body.productid,
            amount: req.body.amount,
        }
       
        try {
            let data = await knex("address").insert(address)
            await knex("orders").insert(order)
            // var token = jwt.sign({ password: user[0].password }, process.env.jwtprivateKey, { expiresIn: "1h" })
            res.status(200).json({ status: true, message: "order created  successfully", data: data })
        } catch (error) {
            console.log(error);
            res.status(200).json({ status: false, message: error.sqlMessage, data: [] })
        }
    }
    if (slug == "get-order") {
       const token=req.body.token
       console.log(token);
       const data=jsonwebtoken.verify(token,process.env.jwtprivateKey)
       console.log(data);
       
    }
}