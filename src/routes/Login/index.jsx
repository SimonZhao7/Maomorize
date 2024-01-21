import './style.css';
import { useState } from 'react';
import {
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../../../firebase'; // Assuming you have initialized Firebase in 'firebase.js' file

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			console.log('User logged in successfully!');
			// redirect user to View Page
		} catch (error) {
			console.error('Error logging in:', error.message);
		}
	};

	const handleGoogleLogin = async () => {
		try {
			// Set up GoogleAuthProvider
			const provider = new GoogleAuthProvider();
			// Sign in with Google using a pop-up window
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			console.log('User logged in with Google successfully!', user);
			// Redirect user to View Page
		} catch (error) {
			console.error('Error logging in with Google:', error.message);
		}
	};

	return (
		<div>
			<input
				type='email'
				placeholder='Email'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				placeholder='Password'
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleLogin}>Login</button>
			<button onClick={handleGoogleLogin}>Continue with Google</button>
		</div>
	);
};

export default Login;
