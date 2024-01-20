import * as React from "react";
import * as ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Upload from './routes/Upload';

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: null,
    children: [
      {
        path: "upload",
        element: <Upload />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
