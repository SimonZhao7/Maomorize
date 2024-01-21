import './style.css';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
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
		</div>
	);
};

export default Login;
