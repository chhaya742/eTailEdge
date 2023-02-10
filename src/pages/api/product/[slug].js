import knex from '../../../../database-config'
export default async function handler(req, res) {
    const slug = req.query.slug
    if (slug == "product-list") {
        try {
            const data = await knex("product").select("*").where({"category":req.body.category})
            res.status(200).json({ status: true, message: "product list", data: data })
        } catch (error) {
            res.status(200).json({ status: false, message: error.sqlMessage, data: [] })
        }
    }

    if (slug == "add-product") {
        const inputData = req.body
        try {
            const data = await knex("product").insert(inputData)
            res.status(200).json({ status: true, message: "product added successfully ", data: data })
        } catch (error) {
            res.status(200).json({ status: false, message: error.sqlMessage, data: [] })
        }
    }

    if (slug == "update-product") {
        const inputData = req.body
        const id =req.body.id
        try {
            const data = await knex("product").update(inputData).where({"id": id})
            res.status(200).json({ status: true, message: "product update successfully ", data: data })
        } catch (error) {
            console.log(error);
            res.status(200).json({ status: false, message: error.sqlMessage, data: [] })
        }
    }
}
