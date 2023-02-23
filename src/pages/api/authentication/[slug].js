import knex from '../../../../database-config'
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
export default async function handler(req, res) {
    const slug = req.query.slug
    if (slug == "signup") {
        // Encrypt

        const newPassword = bcrypt.hashSync(req.body.password, saltRounds);
        const { name, email } = req.body
        try {
            let data = await knex("user").insert({ name, email, password: newPassword })
            const user = await knex("user").select("*").where({ id: data[0] });
            var token = jwt.sign({ email: user[0].email }, process.env.jwtprivateKey, { expiresIn: "1h" })
            res.status(200).json({ status: true, message: "add user successfully", data: token })
        } catch (error) {
            console.log(error);
            res.status(200).json({ status: false, message: error.sqlMessage, data: [] })
        }
    }
    if (slug == "login") {
        try {
            const data = await knex("user").select("*").where({ email: req.body.email })
            if (data.length > 0) {
                const decryptedData = bcrypt.compareSync(req.body.password, data[0].password)
                if (decryptedData) {
                    var token = jwt.sign({ email: data[0].email }, process.env.jwtprivateKey, { expiresIn: "1h" })
                    data[0]["token"] = token
                    res.status(200).json({ status: true, message: "user login successfully", data: data })
                } else {
                    res.status(200).json({ status: false, message: "your password is incorrect", data: [] })
                }
            } else {
                res.status(200).json({ status: false, message: "Email id does not exist", data: [] })
            }
        } catch (error) {
            // console.log(error)
            res.status(200).json({ status: false, message: error.sqlMessage, data: [] })
        }
    }
}