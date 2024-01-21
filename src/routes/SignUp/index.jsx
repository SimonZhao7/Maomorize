import './style.css';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase'; // Assuming you have initialized Firebase in 'firebase.js' file

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSignup = async () => {
		try {
			// Try to create a new user
			await createUserWithEmailAndPassword(auth, email, password);
			console.log('User signed up successfully!');
			// Redirect the user to the View Page
			// You can use a navigation library or set some state to conditionally render the View Page
		} catch (error) {
			// Handle errors, check if the email is already in use, etc.
			console.error('Error signing up:', error.message);
			// Handle the case where the email is already in use
			if (error.code === 'auth/email-already-in-use') {
				console.log(
					'User already exists. Redirect to login page or show a message.'
				);
				// Redirect the user to the login page or display a message
				// You can use a navigation library or set some state to conditionally render the login page or show a message
			}
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
			<button onClick={handleSignup}>Sign Up</button>
		</div>
	);
};

export default SignUp;
