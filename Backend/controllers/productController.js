const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Apifeatures = require("../utils/apifeatures");


//Create Product --- Admin

exports.createProduct = catchAsyncErrors( async (req,res,next)=> {

    req.body.user = req.user.id
    const product = await Product.create(req.body);

    res.status(201).json({
        success : true ,
        product
    })
})

//Get All Products

exports.getAllProducts = catchAsyncErrors(async(req , res )=>{

    const resultPerPage =5;
    const productCount= await Product.countDocuments();
    const apifeature= new  Apifeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apifeature.query ;


    res.status(200).json({
        success : true ,
        products,
        productCount 

    });

})

//Update product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res , next)=>{

    let product = Product.findById(req.params.id);
    if(!product){
        return  res.status(500).json({
            success : false ,
            message : "Product not found" 
        })
    }

    product= await Product.findByIdAndUpdate(req.params.id,req.body ,{
        new : true,
        runValidators:true,
        useFindAndModify : false
    });
    res.status(200).json({
        success : true,
        product
    })

})
//Get Product Details 


exports.getProductDetails = catchAsyncErrors(async (req,res,next) =>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return  next(new ErrorHandler("Product Not Found.. " , 404 ));
    }

    res.status(200).json({
        success:true ,
        product
    })

})

// Delete Product 

exports.deleteProduct = catchAsyncErrors(async(req , res, next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return  next(new ErrorHandler("Product Not Found.. " , 404 ));
    }

    await product.remove();

    res.status(200).json({
        success:true ,
        message : " Product Deleted Successfully .."
    })
});