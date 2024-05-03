import asyncHandler from "express-async-handler";
import productFactory from "../factory/products.js";

const factory = productFactory();

const { getAllProducts, getProductDetails, createProductItem, updateProduct, deleteProductItem } = factory;

const stringifyData = (value) => {
  return JSON.parse(JSON.stringify(value));
};

//                                               Controllers

const fetchAllProducts = asyncHandler(async (req, res, next) => {
  const { limit, offset } = req.query;

  try {
    const response = await getAllProducts({ limit, offset });
    return res.status(200).json(stringifyData(response.data));
  } catch (err) {
    res.status(400);
    throw new Error("Something Went Wrong..."); // Here we are using throw method, so that our error handler can detect the error.

    //  Note : if you pass like :  res.status(400).send("something bad")  then our error handler middleware ca not detect it.
  }
});

const fetchProductDetails = asyncHandler(async (req, res, next) => {
  const { product_id } = req.params;
  try {
    const response = await getProductDetails({ product_id });
    return res.status(200).json(stringifyData(response.data));
  } catch (err) {
    res.status(400);
    throw new Error("Data Not Found");
  }
});

const createProduct = asyncHandler(async (req, res, next) => {
  const data = req.body;
  try {
    const response = await createProductItem(data);
    return res.status(201).json(stringifyData(response.data));
  } catch (err) {
    res.status(400);
    throw new Error("Not Valid Data");
  }

  /**       Body
   {
  "title": "New Product",
  "price": 10,
  "description": "A description",
  "categoryId": 1,
  "images": ["https://placeimg.com/640/480/any"]
}
   */
});

const updateProductDetails = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  let error;
  try {
    const response = await updateProduct({ id, data });
    error = response;
    return res.status(200).json(stringifyData(response.data));
  } catch (err) {
    res.status(400);
    throw new Error(error);
  }

  /**       Body
   {
  "title": "Change title",
  "price": 100
  }
   */
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await deleteProductItem(id);
    return res.status(200).send(response.data);
  } catch (err) {
    res.status(400);
    throw new Error("Something Went Wrong...");
  }
});

export const controllers = {
  fetchAllProducts,
  fetchProductDetails,
  createProduct,
  updateProductDetails,
  deleteProduct,
};
