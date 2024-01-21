import { useState, useEffect } from 'react';
import './Upload.css';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../../firebase';

const Upload = () => {
	const [inputText, setInputText] = useState('');
	const [title, setTitle] = useState('');
	const [userId, setUserId] = useState(null);

	// Get the user ID from the authentication state
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUserId(user.uid);
			} else {
				setUserId(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const handleButtonClick = async () => {
		const savedText = inputText;

		if (userId) {
			// Save the text to Firestore
			const notesCollection = collection(db, 'notes');

			await addDoc(notesCollection, {
				userId: userId,
				title: title,
				text: savedText,
				dateCreated: serverTimestamp(),
				lastStudied: null,
				nextStudy: null,
				interval: 0,
			});

			console.log('Text saved to Firestore:', savedText);
		} else {
			console.error('User not logged in.');
		}
	};

	const countWordsAndCharacters = () => {
		const words = inputText.split(/\s+/).filter((word) => word !== '').length;
		const characters = inputText.length;
		return { words, characters };
	};

	const { words, characters } = countWordsAndCharacters();

	return (
		<div className='upload_div'>
			<h1 className='heading'>Upload Your Notes</h1>

			<label className='upload_label'>Title:</label>
			<input
				type='text'
				id='title'
				className='upload_input'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>

			<label htmlFor='text'>Text:</label>
			<textarea
				id='text'
				className='upload_input'
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
			/>

			<button className='upload_button' onClick={handleButtonClick}>
				Submit for Review
			</button>

			<div className='upload_div'>
				<p className='upload_p'>Word Count: {words}</p>
				<p className='upload_p'>Character Count: {characters}</p>
			</div>
		</div>
	);
};

export default Upload;
