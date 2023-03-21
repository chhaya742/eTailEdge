const knex = require('../../database-config')
import nc from 'next-connect'
import multer from 'multer'
import path from 'path'

export const config = {
    api: {
        bodyParser: false
    },
};

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/products',
        filename: (req, file, cb) => cb(null, Date.now() + '_' + file.originalname),
    }),
});

const handler = nc({
    onError: (err, req, res, next) => {
        // console.error(err.stack);
        console.log(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        res.status(404).end("Page is not found");
    },
})
    .use(upload.single('image'))
    .post(async (req, res) => {
        console.log(req.file);
        try {
            let insertData = req.body;
            insertData.image=`/products/${req.file.filename}`
        
            let data = await knex("product").insert(insertData);
            res.status(200).json({ status: true, message: "product added successfully ", data: data })
        } catch (error) {
            console.log(error);
            res.status(200).json({ status: false, message: error.sqlMessage, data: [] })
        }

    })

export default handler;


