import asyncHandler from "express-async-handler";
import customerFactory from "../factory/customer.js";

const factory = customerFactory();

const { getCustomers, getCustomerDetails, createNewCustomer, updateCustomer } = factory;

const stringifyData = (value) => {
  return JSON.parse(JSON.stringify(value));
};

//                                               Controllers

const fetchAllCustomers = asyncHandler(async (req, res, next) => {
  try {
    const response = await getCustomers();
    return res.status(200).json(stringifyData(response.data));
  } catch (err) {
    if (err.response.data.statusCode) {
      res.status(err.response.data.statusCode);
      throw new Error(err.response.data.message);
    } else {
      res.status(400);
      throw new Error("Something Went Wrong ...");
    }
  }
});

const fetchCustomerDetails = asyncHandler(async (req, res, next) => {
  const { customer_id } = req.params;
  try {
    const response = await getCustomerDetails({ customer_id });
    return res.status(200).json(stringifyData(response.data));
  } catch (err) {
    if (err.response.data.statusCode) {
      res.status(err.response.data.statusCode);
      throw new Error(err.response.data.message);
    } else {
      res.status(400);
      throw new Error("Something Went Wrong ...");
    }
  }
});

const createCustomer = asyncHandler(async (req, res, next) => {
  const payload = req.body;
  try {
    const response = await createNewCustomer(payload);
    return res.status(201).json(stringifyData(response.data));
  } catch (err) {
    if (err.response.data.statusCode) {
      res.status(err.response.data.statusCode);
      throw new Error(err.response.data.message);
    } else {
      res.status(400);
      throw new Error("Something Went Wrong ...");
    }
  }

  /**              Body
   * {
  "name": "Nicolas",
  "email": "nico@gmail.com",
  "password": "1234",
  "avatar": "https://picsum.photos/800"
}
   */
});

const updateCustomerDetails = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const response = await updateCustomer({ id, data });
    return res.status(200).json(stringifyData(response.data));
  } catch (err) {
    if (err.response.data.statusCode) {
      res.status(err.response.data.statusCode);
      throw new Error(err.response.data.message);
    } else {
      res.status(400);
      throw new Error("Something Went Wrong ...");
    }

    // data: {
    //   message: 'This user is not available for updating; instead, create your own user to update.',
    //   error: 'Unauthorized',
    //   statusCode: 401
    // }
  }

  /**     Body
    {
  "email": "john@mail.com",
  "name": "Change name",
}
   */
});

export const controllers = {
  fetchAllCustomers,
  fetchCustomerDetails,
  createCustomer,
  updateCustomerDetails,
};
