import knex from '../../../../database-config'
export default async function handler(req, res) {
    const slug = req.query.slug
    if (slug == "product-list") {
        try {
            const data = await knex("product").select("*").where(req.body)
            let tshirts = {}
            for (let item of data) {

                if (item.title in tshirts) {
                    console.log(item.title);
                    if (!tshirts[item.title].color.includes(item.color) && item.availableqyt > 0) {
                        tshirts[item.title].color.push(item.color)
                    }
                    if (!tshirts[item.title].size.includes(item.size) && item.availableqyt > 0) {
                        tshirts[item.title].size.push(item.size)
                    }
                } else {
                tshirts[item.title] = JSON.parse(JSON.stringify(item))
                if (item.availableqyt > 0) {
                    tshirts[item.title].color = []
                    tshirts[item.title].size = []
                }
                }
            }
            res.status(200).json({ status: true, message: "product list", data: data })
        } catch (error) {
            console.log(error)
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
        const id = req.body.id
        try {
            const data = await knex("product").update(inputData).where({ "id": id })
            res.status(200).json({ status: true, message: "product update successfully ", data: data })
        } catch (error) {
            console.log(error);
            res.status(200).json({ status: false, message: error.sqlMessage, data: [] })
        }
    }
}
