import Product from "../models/product.js";

// Create a new product

export const createProduct = async(req,res)=>{
    try{
        const  product = await Product.create(req.body); // craete method
        res.status(201).json(product);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all products

export const getProducts = async(req,res)=>{
    try{
    
        const getpro = await Product.find();
        res.send("products -----")
        res.json(products);
    }
    catch(err){
        console.log(err)
    }


}