import express from "express";
import { controllers } from "../controllers/customer.js";

const moduleRouter = express.Router();

moduleRouter.get("/customers", controllers.fetchAllCustomers);
// moduleRouter.get("/customers/:customer_id", controllers.fetchCustomerDetails);
// moduleRouter.delete("/customers/:customer_id", controllers.deleteCustomer);
// moduleRouter.delete("/customer", controllers.deleteAllCustomer);
// moduleRouter.post("/customer", controllers.createCustomer);
// moduleRouter.patch("/customer/customer_id", controllers.updateCustomerDetails);

export default moduleRouter;

