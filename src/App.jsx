import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Upload from './routes/Upload';
import Review from './routes/Review';
import Feedback from './routes/Feedback';
import View from './routes/View';
import Landing from './routes/Landing';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import Forgot from './routes/Forgot';
import Component from './routes/Component';
// Loaders
import { loader as feedbackLoader } from './routes/Feedback';

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
		path: '/signup',
		element: <SignUp />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/review',
		element: <Review />,
	},
	{
		path: '/forgot',
		element: <Forgot />,
	},
	{
		path: '/component',
		element: <Component />,
	},
	{
		path: '/feedback/:id',
		element: <Feedback />,
		loader: feedbackLoader,
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
