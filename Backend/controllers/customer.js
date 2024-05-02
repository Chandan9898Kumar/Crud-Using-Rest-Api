import asyncHandler from "express-async-handler";
import bcrypt, { compare } from "bcrypt";
import customerFactory from "../factory/customer.js";

const factory = customerFactory();

const { getCustomers } = factory;

const stringifyData = (value) => {
  return JSON.parse(JSON.stringify(value));
};

//                                               Controllers

const fetchAllCustomers = asyncHandler(async (req, res, next) => {
  
  try {
    const response = await getCustomers();
    return res.status(200).json(stringifyData(response.data));
  } catch (err) {
    return res.status(400).json("Not Found");
  }
});

export const controllers = {
  fetchAllCustomers,
};
