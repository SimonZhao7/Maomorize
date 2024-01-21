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
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
