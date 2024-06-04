import { useState, useEffect } from "react";

const useFetch = (api, options = "") => {
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const jsonData = await fetch(api, { ...options, signal });
        const result = await jsonData.json();
        setData(result);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetching data was aborted");
        } else {
          setIsError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

    return () => {
      controller.abort();
    };
  }, [api, options]);

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

/**                                                       useFetch hooks for TypeScript.
 

import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useReducer, useCallback } from "react";

const useFetch = <T>({ url, method, body, config }: FetchParams) => {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isLoading: false,
    error: null,
  });

  function reducer(state: State<T>, action: Action<T>) {
    switch (action.type) {
      case "loading":
        return { ...state, isLoading: true };
      case "success":
        return { data: action.data, isLoading: false, error: null };
      case "error":
        return { data: null, isLoading: false, error: action.error };
      default:
        throw new Error("Unknown action type");
    }
  }
  useEffect(() => {
    let shouldCancel = false;

    const callFetch = async () => {
      dispatch({ type: "loading", error: undefined });

      try {
        const response = await fetch(url, method, body, config);
        if (shouldCancel) return;
        dispatch({ type: "success", data: response.data });
      } catch (error: any) {
        if (shouldCancel) return;
        dispatch({ type: "error", error });
      }

      callFetch();
      return () => (shouldCancel = true);
    };
  }, [url]);

  return { state };
};
export default useFetch;

export const useMyFetch = <T>({ url, method, config }: FetchParams) => {
 // same reducer syntax

  const fetchData = useCallback(
    async (data: any) => {
      try {
        dispatch({ type: "loading", error: undefined });
        const response = await fetch(url, method, data, config);
        dispatch({ type: "success", data: response.data });
        return response.data;
      } catch (error: any) {
        dispatch({ type: "error", error });
        console.error(error);
        throw error;
      }
    },
    [url]
  );

  return { state, fetchData };
};

const fetch = async (
  url: string,
  method: Methods,
  body?: any,
  config?: any
): Promise<AxiosResponse> => {
  console.log({ body });
  switch (method) {
    case "POST":
      return await axios.post(url, body, config);
    case "GET":
      return await axios.get(url, config);
    case "DELETE":
      return await axios.delete(url, config);
    default:
      throw new Error("Unknown request method");
  }
};

type Methods = "POST" | "GET" | "DELETE";

type FetchParams = {
  url: string;
  method: Methods;
  body?: any;
  config?: any;
};

// response.data attribute defined as string until needed otherwise.
type State<T> =
  | { data: null; isLoading: boolean; error: null }
  | { data: null; isLoading: boolean; error: AxiosError }
  | { data: T; isLoading: boolean; error: null };

type Action<T> =
  | { type: "loading"; error: undefined }
  | { type: "success"; data: T }
  | { type: "error"; error: AxiosError };
 */
