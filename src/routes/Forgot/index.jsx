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

		<div className='forgot-wrapper'>
			<div className='forgot-container'>
				<label htmlFor='email'>Email:</label>
				<input
					type='email'
					id='email'
					placeholder='Enter your email'
					onChange={(e) => setEmail(e.target.value)}
				/>
	
					
					<button className='forgot-login-button' onClick={handleResetPassword}>
						Reset Password
					</button>

				
					<div className='forgot-login-button'>
						<Link className='login-link' to='/login'>Remember your password?</Link>
					</div>
				{/* <div className='login-form'>
				
				</div> */}
			</div>
			<div className='forgot-mao-background'>
				&nbsp;
		</div>
		</div>
		
	);
};

export default Forgot;