import knex from '../../../database-config'

export default async function handler(req, res) {
    const paginateTotal = async (searchFrom, search, status, table) => {
        let results = knex(table)
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
    const paginate = (limit, offset, searchFrom, status, sort, search, order, table) => {
        let rows = knex(table)
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
    if (slug == "user") {
        try {

            let { offset = 0, limit = "", order = "asc", sort = "id", search, status } = req.body;

            let searchFrom = [
                "name",
                "email",
                "phone"
            ]
            const total = await paginateTotal(searchFrom, search, status, "user")

            const rows = await paginate(limit, offset, searchFrom, status, sort, search, order, "user")
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
            res.status(200).json({
                error: false,
                message: "user received successfully.",
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
    if (slug == "user-update") {
        const inputData = req.body
        console.log("inputData",inputData);
        const id = req.body.id
        try {
            const data = await knex("user").update(inputData).where({ "id": id })
            res.status(200).json({ status: true, message: "user Deactivate successfully ", data: data })
        } catch (error) {
            res.status(200).json({ status: false, message: error.sqlMessage, data: [] })
        }
    }
}
