import React, { Suspense, lazy } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ToDoMenuDrawer from "./Components/ToDoApp/SideDrawer";
import Loader from "./Loader/Loader";
const NavLinks = lazy(() => import("./NavLinks/NavLink"));
const AccountLogin = lazy(() => import("./Login/Login"));
const AccountRegister = lazy(() => import("./Register/Register"));
const Home = lazy(() => import("./HomePage/HomePage"));
const DragDrop = lazy(() => import("./Components/DragAndDrop/DragDrop"));
const Contact = lazy(() => import("./Components/Contacts/Contact"));
const ProjectList = lazy(() => import("./Components/ToDoApp/ProjectList"));
const CreateProject = lazy(() => import("./Components/ToDoApp/CreateProject"));
const ShowProject = lazy(() => import("./Components/ToDoApp/ShowProject"));
const EditProject = lazy(() => import("./Components/ToDoApp/EditProject"));

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
