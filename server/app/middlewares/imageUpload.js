const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/express_agency/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const extension = path.extension(file.originalname);
        if(extension !== ".png" || extension !== '.jpg' || extension !== '.jpeg') {
            return cb(res.status(400).end("only png, jpg and jpeg files are allowed"), false);
        }
        cb(null, true);
    }
})
   
const upload = multer({ storage: storage }).single("file");

module.exports = upload;