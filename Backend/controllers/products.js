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
  let data;
  try {
    const response = await getProducts({ limit, offset });
    data = response;
    return res.status(200).json(stringifyData(response.data));
  } catch (err) {
    return res.status(400).json(data);
  }
});

export const controllers = {
  fetchAllProducts,
};
