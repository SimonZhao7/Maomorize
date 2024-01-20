import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Upload from './routes/Upload';
import Review from './routes/Review';
import View from './routes/View';

const router = createBrowserRouter([
	{
		path: '/',
		element: null,
		children: [
			{
				path: 'upload',
				element: <Upload />,
			},
			{
				path: 'view',
				element: <View />,
			},
		],
	},
	{
		path: '/review',
		element: <Review />,
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
