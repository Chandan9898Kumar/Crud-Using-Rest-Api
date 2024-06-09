import axios from "axios";

const customerFactory = () => {
  const getCustomers = () => axios.get(`https://api.escuelajs.co/api/v1/users`);

  const getCustomerDetails = ({ customer_id: id }) => axios.get(`https://api.escuelajs.co/api/v1/users/${id}`);

  const createNewCustomer = (payload) => axios.post(`https://api.escuelajs.co/api/v1/users/`, payload);

  const updateCustomer = ({ id, data }) => {
    return axios.put(`https://api.escuelajs.co/api/v1/users/${id}`, data);
  };

  return {
    getCustomers,
    getCustomerDetails,
    createNewCustomer,
    updateCustomer,
  };
};

export default customerFactory;

//  Note : Here we don't need to make this factory component,we can directly send data from controllers as well.

// NOTE: The whole business logic will be in the Factory/Service component/layer that exports certain services (methods) which are used by the controller.
