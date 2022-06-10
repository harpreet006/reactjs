const {connection} = require('../services/db');
/**
* This function will show address form.
*/

exports.addProduct = async (req,res,next) => {
	// console.log(req,"ddddddddd");
	
	const productName=req.body.productName;
	const productModel=req.body.productModel;
	const productPrice=req.body.productPrice;
	const productimage=req.body.productimage;
	res.send({'success':'Successfully'});

}

exports.uploadProductFile = async (req,res,next) => {
	 console.log(req)
}
 
