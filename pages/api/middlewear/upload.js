const path = require('path')
export default async function handler(req, res,next) {
    if (!req.files) {
        res.send("image field can't be blank")
    }

    const filess = req.files.image;
    // console.log(filess);
    const uploadPath = path.join(__dirname, "..", '/uploads/', filess.name);
    const fileName = '/uploads/'+ filess.name; 
    res.filepath = fileName 
    /* mv used for moving file */
    filess.mv(uploadPath, function (err) {    

        if (err)
            return res.status(500).send(err);
        next()
    })


}