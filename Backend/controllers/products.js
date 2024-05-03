import asyncHandler from "express-async-handler";
import productFactory from "../factory/products.js";

const factory = productFactory();

const { getProducts } = factory;

const stringifyData = (value) => {
  return JSON.parse(JSON.stringify(value));
};

//                                               Controllers

const fetchAllProducts = asyncHandler(async (req, res, next) => {
  const { limit, offset } = req.query;

  try {
    const response = await getProducts({ limit, offset });
    return res.status(200).json(stringifyData(response.data));
  } catch (err) {
    res.status(400);
    throw new Error("Something Went Wrong..."); // Here we are using throw method, so that our error handler can detect the error.

    //  Note : if you pass like :  res.status(400).send("something bad")  then our error handler middleware ca not detect it.
  }
});

export const controllers = {
  fetchAllProducts,
};
