import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Upload from './routes/Upload';
import View from './routes/View';
import './App.css';

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
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
