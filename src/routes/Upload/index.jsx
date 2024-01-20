import './Upload.css';
import React, { useState } from 'react';

const Upload = () => {
	// State variable to store the input text
	const [inputText, setInputText] = useState('');

	// Function to handle the button click and save the input text
	const handleButtonClick = () => {
		// You can perform any additional logic or validation here before saving
		const savedText = inputText;
		console.log('Text saved:', savedText);
		// You can use 'savedText' as needed in your component or pass it to other functions/components
	};

	return (
		<div>
			{/* Input field */}
			<input
				type='text'
				value={inputText}
				onChange={(e) => {
					setInputText(e.target.value),
						console.log('Text saved:', setInputText);
				}}
			/>

			{/* Button to trigger saving */}
			<button onClick={handleButtonClick}>Save Text</button>
		</div>
	);
};

export default Upload;
