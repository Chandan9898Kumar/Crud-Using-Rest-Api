import axios from "axios";

const productFactory = () => {
  const getProducts = ({ offset = "", limit = "", ...rest }) => axios.get(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`);
  return {
    getProducts,
  };
};

export default productFactory;

//  Note : Here we don't need to make this factory component,we can directly send data from controllers as well.
