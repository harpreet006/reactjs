const {connection} = require('../services/db');
const Product = require('../models/Product');
const ProductModel= new Product();
/**
* This function will show address form.
*/

exports.addProduct = async (req,res,next) => {
	const productName=req.body.productName;
	const productModel=req.body.productModel;
	const productPrice=req.body.productPrice;
	const productimage=req.file.filename;
    // console.log(req.userId,productName,productModel,productPrice,productimage)
    if(req.userId){
        connection.query(ProductModel.addProducts(req.userId,productName,productModel,productPrice,productimage), (err,result) => {
            if(err)
                console.log(err);
            if(result){
                res.json({status:"success",message:"User successfully created"});
            }else{
                res.json({status:"error",message:"something went wrong !"});
            }
        });
    }
}



exports.productRemove = async (req,res,next) => {
    const userId=req.userId;
    // console.log(userId)
    connection.query(ProductModel.ItemRemove(req.body.id), (err,result) => {
        if(err)
            res.json({error:"!Error",message:"There is some problem"});
        if(result){
            connection.query(ProductModel.ProductList(userId), (err,result) => {
            if(err){
                // console.log("dsfsd")
                res.json({error:"!Error",message:"There is some problem"});
            }
            if(result){
                console.log(result);
                // return false;
                res.json({success:result,message:"Item successfully deleted"});

            }else{
                res.json({error:"!Error",message:"There is some problem"});
            }
            });

        }else{
            res.json({error:"!Error",message:"There is some problem"});
        }
    });
    // return false;
}


exports.proListing = async (req,res,next) => {
	 if(req.userId){
        // console.log(req.userId);
        connection.query(ProductModel.ProductList(req.userId), (err,result) => {
            if(err)
                res.json({status:"error",message:err});
            if(result){
                res.json({status:"success",result:result});
            }else{
                res.json({status:"error",message:"something went wrong !"});
            }
        });
     }else{
        res.json({status:"error",message:"something went wrong !"});
     }
}
 
