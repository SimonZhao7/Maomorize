import './style.css'; // Import the CSS file
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase'; // Assuming you have initialized Firebase in 'firebase.js' file
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSignup = async () => {
		try {
			// Try to create a new user
			await createUserWithEmailAndPassword(auth, email, password);
			console.log('User signed up successfully!');
			// Redirect the user to the View Page
			// You can use a navigation library or set some state to conditionally render the View Page
			navigate('/view');
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
		<div className='mao-background'>
			<div className='container'>
				<div className='login-form'>
					<h1>Sign Up</h1>
					<div className='input-group'>
						<input
							type='email'
							placeholder='Email'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className='input-group'>
						<input
							type='password'
							placeholder='Password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<button className='login-button' onClick={handleSignup}>
						Login
					</button>

					{/* Link to Forgot Password */}
				</div>
			</div>
		</div>
	);

	/* 
				<h2 className='signup-h2'>Sign Up</h2>
				<div className='input-group'>
					<label className='signup-label'>Email:</label>
					<input
						type='email'
						placeholder='Enter your email'
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='input-group'>
					<label className='signup-label'>Password:</label>
					<input
						type='password'
						className='signup-input'
						placeholder='Enter your password'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button className='signup-button' onClick={handleSignup}>
					Sign Up
				</button
			</div>
		</div> */
};

export default SignUp;
