import axios from "axios";

const getUsers = () => {
  return axios.get("https://api.github.com/search/repositories?q=facebook/react");
};

export const Api = {
  getUsers,
};
