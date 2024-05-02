import express from "express";
import { controllers } from "../controllers/products.js";

const productRouter = express.Router();

productRouter.get("/products", controllers.fetchAllProducts);
// productRouter.get("/products/:customer_id", controllers.fetchCustomerDetails);
// productRouter.delete("/products/:customer_id", controllers.deleteCustomer);
// productRouter.delete("/products", controllers.deleteAllCustomer);
// productRouter.post("/products", controllers.createCustomer);
// productRouter.patch("/products/customer_id", controllers.updateCustomerDetails);

export default productRouter;
