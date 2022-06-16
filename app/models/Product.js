class Product{
	constructor(){
		 
	}

	addProducts(userId,productName,productSlug,productModel,productPrice,productimage){
		let sql = `INSERT INTO products_collection (userId,productName,productSlug,productModel,productPrice,productimage) VALUES ('${userId}','${productName}','${productSlug}','${productModel}','${productPrice}','${productimage}')`;
		return sql;
	}

	SlugExist(slug){
		let sql = `SELECT * FROM  products_collection WHERE 	productSlug='${slug}'`;
		return sql;
	}

	ProductList(userId){
		let sql = `SELECT * FROM  products_collection WHERE userId=${userId} ORDER BY id DESC`;
		return sql;
	}

	ItemRemove(userId){
		let sql = `DELETE FROM products_collection WHERE id=${userId}`;
		return sql;
	}

}
module.exports = Product;