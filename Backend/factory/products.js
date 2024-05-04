import axios from "axios";

const productFactory = () => {
  const getAllProducts = ({ offset = "", limit = "", ...rest }) => axios.get(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`);

  const getProductDetails = ({ product_id: id }) => {
    return axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
  };

  const createProductItem = (data) => axios.post("https://api.escuelajs.co/api/v1/products/", data);

  const updateProduct = ({ id, data }) => {
    return axios.put(`https://api.escuelajs.co/api/v1/products/${id}`, data);
  };

  const deleteProductItem = (id) => {
    return axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
  };
  return {
    getAllProducts,
    getProductDetails,
    createProductItem,
    updateProduct,
    deleteProductItem,
  };
};

export default productFactory;

//  Note : Here we don't need to make this factory component,we can directly send data from controllers as well.
