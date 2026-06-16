import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name:{
      type:String,
      required:[true,"should you enter the product name"],
      trim:true,
      maxLength:[50,"product name connot exceed"]
    },
  
    price:{
      type:Number,
      required:[true,"Enter the product price"]
    },
    description:{
      type:String,
      required:[true,"Enter the product descriotion"]

    },
    rating:{
      type:String,
      default:0

    },
    images:[
      {
        images:{
          type:String,
          required:true
        }
      }

    ],
    category: {
  type: String,
  required: [true, "enter the product category"],
  enum: {
    values: [
      "electronic",
      "foods",
      "mobilePhones",
      "Laptops",
      "Accessries",
      "Headphones",
      "Bokks",
      "Clothes/shows",
      "Beauty/health",
      "Sports",
      "outdoor",
      "Home"
    ],
    message: "please select correct Category"
  }
},
    seller:{
      type:String,
      required:[true,"Enter the seller name of the product"]
    },

    stock:{
      type:Number,
      required:[true,"please enter the product stock"],
      maxLength:[20,"product stock cannot exceed 20"]
    },

    numberOfReviews:{
      type:Number,
      default:0
    },

    reviews:[
      {
        name:{
          type:String,
          required:true
        },

        rating:{
          type:String,
          required:true
        },

        comments:{
          type:String,
          required:true
        }
      }
    ],

    createAt:{
      type:Date,
      default:Date.now()
    }
});

const Product = mongoose.model("Product", productSchema);

export default Product;