import { useState, useEffect } from "react";

const useFetch = (api) => {
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const jsonData = await fetch(api);
        const result = await jsonData.json();
        setData(result);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [api]);

  return [data, isError, isLoading];
};

export default useFetch;

/**                                                                              Example of using this hooks.

import React from "react";
import FetchUser from "./ContainerComponent";

const UserDetails = () => {
  const api = "https://random-data-api.com/api/v2/users";
  const { error, loading, user } = FetchUser(api);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (user) {
    const { first_name, last_name, email, phone_number } = user;

    return (
      <div>
        <h2>
          Name: {first_name} {last_name}
        </h2>
        <p>{email}</p>
        <p>{phone_number}</p>
      </div>
    );
  }
};

export default UserDetails;
 */

//                                                                                       By using Axios

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// function useFetchAxios(url) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//       setLoading(true)

//       const source = axios.CancelToken.source();
//       axios.get(url, { cancelToken: source.token })
//       .then(res => {
//           setLoading(false);
//checking for multiple responses for more flexibility with the url we send in.
//           res.data.content && setData(res.data.content);
//           res.content && setData(res.content);
//       })
//       .catch(err => {
//           setLoading(false)
//           setError(err)
//       })
//       return () => {
//           source.cancel();
//       }
//   }, [url])

//   return { data, loading, error }

// export default useFetchAxios;

//                                                                          Example of using this.

// import useFetchAxios from './useFetch';

// function App() {
//   const { data: quote, loading, error } = useFetch('https://api.quotable.io/random')

//   return (
//     <div className="App">
//       { loading && <p>{loading}</p> }
//       { quote && <p>"{quote}"</p> }
//       { error && <p>{error}</p> }
//     </div>
//   );
// }

// export default App;
