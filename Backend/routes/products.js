import express from "express";
import { controllers } from "../controllers/products.js";

const productRouter = express.Router();

//                                     Define the API routes

productRouter.get("/products", controllers.fetchAllProducts);
productRouter.get("/products/:product_id", controllers.fetchProductDetails);
productRouter.delete("/products/:id", controllers.deleteProduct);
productRouter.post("/products", controllers.createProduct);
productRouter.put("/products/:id", controllers.updateProductDetails);

export default productRouter;
