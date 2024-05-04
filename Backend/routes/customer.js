import express from "express";
import { controllers } from "../controllers/customer.js";

const moduleRouter = express.Router();

moduleRouter.get("/customers", controllers.fetchAllCustomers);
moduleRouter.get("/customers/:customer_id", controllers.fetchCustomerDetails);
moduleRouter.post("/customers", controllers.createCustomer);
moduleRouter.put("/customers/:id", controllers.updateCustomerDetails);
// moduleRouter.delete("/customers/:customer_id", controllers.deleteCustomer);
// moduleRouter.delete("/customer", controllers.deleteAllCustomer);

export default moduleRouter;
