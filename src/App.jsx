<<<<<<< HEAD
import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Upload from './routes/Upload';
import Review from './routes/Review';
import View from './routes/View';
import Landing from './routes/Landing';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
const router = createBrowserRouter([
	{
		path: '/',
		element: <Landing />,
	},
	{
		path: '/upload',
		element: <Upload />,
	},
	{
		path: '/view',
		element: <View />,
	},
	{
		path: '/review',
		element: <Review />,
	},
	{
		path: '/signup',
		element: <SignUp />,
	},
	{
		path: '/login',
		element: <Login />,
	},
=======
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
>>>>>>> 0b54661fae1dd3ec4ac2f3cc174f38e7ebec2126
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
