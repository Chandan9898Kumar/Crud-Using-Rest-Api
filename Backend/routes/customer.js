import express from "express";

const moduleRouter = express.Router();

moduleRouter.route("/customers").get(controllers.fetchAllCustomers);
moduleRouter.route("/customers/:customer_id").get(controllers.fetchCustomerDetails);
moduleRouter.route("/customers/:customer_id").delete(controllers.deleteCustomer);
moduleRouter.route("/customer").delete(controllers.deleteAllCustomer);
moduleRouter.route("/customer").post(controllers.createCustomer);
moduleRouter.route("/customer/customer_id").patch(controllers.updateCustomerDetails);


export default moduleRouter;
