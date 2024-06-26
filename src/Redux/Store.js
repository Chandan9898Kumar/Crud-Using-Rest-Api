import { configureStore } from "@reduxjs/toolkit";

import CreateProjectComponent from "../Redux/TodoApplication/CreateProjectReducer";
import EditProjectComponent from "../Redux/TodoApplication/EditProjectReducer";
import ProjectComponent from "../Redux/TodoApplication/ProjectListReducer";
import ShowProjectComponent from "../Redux/TodoApplication/ShowProjectReducer";
export const store = configureStore({
  reducer: {
    BaseProjectComponent: ProjectComponent,
    CreateProject: CreateProjectComponent,
    EditProject: EditProjectComponent,
    ShowProject: ShowProjectComponent,
  },
});
