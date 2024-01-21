import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Upload from "./routes/Upload";
import Review from "./routes/Review";
import Feedback from "./routes/Feedback";
import View from "./routes/View";
import Landing from "./routes/Landing";
// Loaders
import { loader as feedbackLoader } from "./routes/Feedback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "/view",
    element: <View />,
  },
  {
    path: "/review",
    element: <Review />,
  },
  {
    path: "/feedback/:id",
    element: <Feedback />,
    loader: feedbackLoader,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
