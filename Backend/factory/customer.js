import axios from "axios";

const customerFactory = () => {
  const getCustomers = () => axios.get(`https://api.escuelajs.co/api/v1/users`);
  return {
    getCustomers,
  };
};

export default customerFactory;

//  Note : Here we don't need to make this factory component,we can directly send data from controllers as well.
