var express = require('express');
var router = express.Router();
var multer = require('multer');
const DIR = './public/product_images';
const productController = require('../controllers/productController');
const { uuid } = require('uuidv4');
const verifyToken  = require('../middleware/VerifyToken');
const product = require('../models/Product');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post('/addproduct',verifyToken , productController.addProduct);
router.post('/fileUpload',verifyToken ,upload.single('selectedFile'), productController.addProduct);
router.get('/getproducts',verifyToken , productController.proListing);
router.get('/singlePage',verifyToken , productController.singleProduct);
router.post('/deleteProduct',verifyToken , productController.productRemove);
 
module.exports = router;

