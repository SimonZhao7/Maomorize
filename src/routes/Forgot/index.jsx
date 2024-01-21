import './style.css';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase'; // Assuming you have initialized Firebase in 'firebase.js' file
import { Link, useNavigate } from 'react-router-dom';

const Forgot = () => {
	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	const handleResetPassword = async () => {
		try {
			// Send password reset email
			await sendPasswordResetEmail(auth, email);

			console.log('Password reset email sent successfully!');
			// Provide user feedback or redirect them to a confirmation page
		} catch (error) {
			console.error('Error sending password reset email:', error.message);
		}
	};

	return (
		<div className='mao-background'>
			<div className='container'>
				<div className='login-form'>
					<div className='input-group'>
						<label htmlFor='email'>Email:</label>
						<input
							type='email'
							id='email'
							placeholder='Enter your email'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<button className='login-button' onClick={handleResetPassword}>
						Reset Password
					</button>

					{/* Link to Login Page */}
					<div className='login-button'>
						<Link to='/login'>Remember your password?</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Forgot;
