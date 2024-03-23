import axios from "axios";

const getUsers = () => {
  return axios.get("https://api.github.com/search/repositories?q=facebook/react");
};

const getProducts = (offset = 0, limit = 20) => {
  return axios.get(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`);

  //  In the above code, there are two parameters in the API endpoint –     offset and limit,
  // the offset state is used to determine the starting index of the products to be fetched, and the limit is the limit of the number of products to be fetched – in this case, it is 20.
};

const getPokeMonData = () => {
  return axios.get("https://pokeapi.co/api/v2");
};

export const Api = {
  getUsers,
  getProducts,
  getPokeMonData,
};
