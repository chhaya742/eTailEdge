import knex from '../../../database-config'
const path = require('path')
export default async function handler(req, res) {
    const paginateCourseTotal = async(searchFrom, search, status) => {
        let results = knex("product")
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
    const paginateCourse = (limit, offset, searchFrom, status, sort, search, order) => {
        let rows = knex("product")
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
    if (slug == "product-list") {
        try {
            const data = await knex("product").select("*").where(req.body)
            let tshirts = {}
            for (let item of data) {

                if (item.title in tshirts) {
                  
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
            console.log(data);
            res.status(200).json({ status: true, message: "product list", data: data })
        } catch (error) {
            res.status(200).json({ status: false, message: error.sqlMessage, data: [] })
        }
    }
    if (slug == "products") {
        try {
          
            let {offset = 0, limit = 10, order = "asc", sort = "id", search, status} = req.body;
    
            let searchFrom = [
                "name"
            ]
            const total = await paginateCourseTotal(searchFrom, search, status)
    
            const rows = await paginateCourse(limit, offset, searchFrom, status, sort, search, order)
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
                message: "products received successfully.",
                data: {
                    rows: data_rows,
                    total
                }
            });
            res.end()
        } catch (e) {
            console.log(e)
            res.json({error: true, message: "Something went wrong", data: e})
        }
        res.end()
    }

    if (slug == "add-product") {
        const inputData = req.body
        console.log(inputData);
        try {
            if (!inputData.image) {
                res.send("image field can't be blank")
            }
        
            const filess =inputData.image
            console.log(filess);
            const uploadPath = path.join(__dirname, "..", '/uploads/', filess);
            const fileName = '/uploads/'+ filess; 
            res.filepath = fileName 
            /* mv used for moving file */
            // filess.mv(uploadPath, function (err) {    
        
            //     if (err)
            //         return res.status(500).send(err);
            //     next()
            // })
            const data = await knex("product").insert(inputData)
            res.status(200).json({ status: true, message: "product added successfully ", data: data })
        } catch (error) {
            console.log(error);
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
            res.status(200).json({ status: false, message: error.sqlMessage, data: [] })
        }
    }
}
