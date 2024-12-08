import React, { Suspense, lazy } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ToDoMenuDrawer from "./Components/ToDoApp/SideDrawer";
import Loader from "./Loader/Loader";

const lazyRetry = function (componentImport) {
  return new Promise((resolve, reject) => {
    const hasRefreshed = JSON.parse(window.sessionStorage.getItem("retry-lazy-refreshed") || "false");

    componentImport()
      .then((component) => {
        window.sessionStorage.setItem("retry-lazy-refreshed", "false");
        resolve(component);
      })
      .catch((error) => {
        if (!hasRefreshed) {
          // not been refreshed yet
          window.sessionStorage.setItem("retry-lazy-refreshed", "true");
          return window.location.reload(); // refresh the page
        }
        reject(error);
      });
  });
};

const NavLinks = lazy(() => lazyRetry(() => import("./NavLinks/NavLink")));
const AccountLogin = lazy(() => lazyRetry(() => import(/*webpackChunkName: "login-page" */ "./Login/Login")));
const AccountRegister = lazy(() => lazyRetry(() => import(/*webpackChunkName: "register-page" */ "./Register/Register")));
const Home = lazy(() => lazyRetry(() => import(/*webpackChunkName: "home-page" */ "./HomePage/HomePage")));
const DragDrop = lazy(() => lazyRetry(() => import(/*webpackChunkName: "drag-drop" */ "./Components/DragAndDrop/DragDrop")));
const Contact = lazy(() => lazyRetry(() => import(/*webpackChunkName: "contact-page" */ "./Components/Contacts/Contact")));
const ProjectList = lazy(() => lazyRetry(() => import("./Components/ToDoApp/ProjectList")));
const CreateProject = lazy(() => lazyRetry(() => import("./Components/ToDoApp/CreateProject")));
const ShowProject = lazy(() => lazyRetry(() => import("./Components/ToDoApp/ShowProject")));
const EditProject = lazy(() => lazyRetry(() => import("./Components/ToDoApp/EditProject")));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <NavLinks />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<AccountLogin />} />
            <Route exact path="/register" element={<AccountRegister />} />
            <Route exact path="/drag-drop" element={<DragDrop />} />
            <Route exact path="/contact" element={<Contact />} />

            {/* TO-DO APP Protected Route  */}
            <Route
              element={
                <PrivateRoute>
                  <ToDoMenuDrawer />{" "}
                </PrivateRoute>
              }
            >
              <Route
                exact
                path="/todo"
                element={
                  <PrivateRoute>
                    <ProjectList />{" "}
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/create-app"
                element={
                  <PrivateRoute>
                    {" "}
                    <CreateProject />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/show/:id"
                element={
                  <PrivateRoute>
                    <ShowProject />{" "}
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/edit/:id"
                element={
                  <PrivateRoute>
                    <EditProject />{" "}
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;

export const PrivateRoute = ({ children }) => {
  const authorizedToken = localStorage.getItem("token");
  if (!authorizedToken) {
    return <Navigate to="/login" replace />;
  }
  return <React.Fragment>{authorizedToken && children}</React.Fragment>;
};

//                                                    Protected Route

//    STEP 1.

// import { Outlet, Navigate } from 'react-router-dom'

// const PrivateRoutes = () => {
//     let auth = {'token': false}
//     return(
//         auth.token ? <Outlet/> : <Navigate to="/login"/>
//     )
// }

// export default PrivateRoutes

//  STEP  2.

// function App() {
//   return (
//     <div className="App">
//         <Router>
//           <Routes>
//             <Route element={<PrivateRoutes />}>
//                 <Route element={<Home/>} path="/" exact/>
//                 <Route element={<Products/>} path="/products"/>
//             </Route>
//             <Route element={<Login/>} path="/login"/>
//           </Routes>
//       </Router>
//     </div>
//   );
// }
