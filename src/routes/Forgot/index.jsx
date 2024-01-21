import './style.css';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase'; // Assuming you have initialized Firebase in 'firebase.js' file

const Forgot = () => {
	const [email, setEmail] = useState('');

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
		<div className='container'>
			<div className='input-group'>
				<label htmlFor='email'>Email:</label>
				<input
					type='email'
					id='email'
					placeholder='Enter your email'
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>

			<button onClick={handleResetPassword}>Reset Password</button>
		</div>
	);
};

export default Forgot;
