import { useState } from 'react';
import './Upload.css';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';

const Upload = () => {
	// State variables to store input text and user ID
	const [inputText, setInputText] = useState('');
	const [userId, setUserId] = useState('user123'); // Replace 'user123' with the actual user ID

	// Asynchronous function to handle the button click and save the input text
	const handleButtonClick = async () => {
		// You can perform any additional logic or validation here before saving
		const savedText = inputText;

		// Save the text to Firestore
		// Save the text to the 'notes' collection
		const notesCollection = collection(db, 'notes');

		// Add a new document to the 'notes' collection with additional fields
		await addDoc(notesCollection, {
			userId: userId,
			text: savedText,
			dateCreated: serverTimestamp(),
			lastStudied: null, // Default value is null
			nextStudy: null, // Default value is null
			interval: 0, // Default value is 0
		});

		console.log('Text saved to Firestore:', savedText);
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
				}}
			/>

			{/* Button to trigger saving with optional custom document ID */}
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
