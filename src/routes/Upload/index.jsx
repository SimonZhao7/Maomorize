import React, { useState } from 'react';
import './Upload.css';

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

	// Function to count words and characters
	const countWordsAndCharacters = () => {
		const words = inputText.split(/\s+/).filter((word) => word !== '').length;
		const characters = inputText.length;
		return { words, characters };
	};

	// Display word and character count
	const { words, characters } = countWordsAndCharacters();

	return (
		<div>
			{/* Heading */}
			<h1>Upload Your Notes</h1>

			{/* Input field */}
			<input
				type='text'
				value={inputText}
				onChange={(e) => {
					setInputText(e.target.value);
					console.log('Text saved:', setInputText);
				}}
			/>

			{/* Button to trigger saving */}
			<button onClick={handleButtonClick}>Submit for Review</button>

			{/* Display word and character count */}
			<div>
				<p>Word Count: {words}</p>
				<p>Character Count: {characters}</p>
			</div>
		</div>
	);
};

export default Upload;
