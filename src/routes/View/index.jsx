// View.jsx

import { useState, useEffect } from 'react';
import './View.css';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../../firebase';
import { Link } from 'react-router-dom';

const View = ({ userId }) => {
	const [userDocuments, setUserDocuments] = useState([]);

	useEffect(() => {
		const fetchUserDocuments = async () => {
			try {
				const q = query(collection(db, 'notes'), where('userId', '==', userId));
				const querySnapshot = await getDocs(q);

				const documents = [];
				querySnapshot.forEach((doc) => {
					documents.push({ id: doc.id, ...doc.data() });
				});

				setUserDocuments(documents);
			} catch (error) {
				console.error('Error fetching documents:', error);
			}
		};

		// Call the fetchUserDocuments function directly
		fetchUserDocuments();
	}, [userId]); // Trigger the effect when userId changes

	return (
		<div className='view-container'>
			{/* Heading */}
			<h1>View Page</h1>

			{/* Display user documents */}
			{userDocuments.length > 0 ? (
				<div className='document-list'>
					{userDocuments.map((document) => (
						<div key={document.id} className='document-box'>
							{document.title}
							<br />
							<strong>Text:</strong> {document.text}
						</div>
						//! Change Text to studyNext after implementing the timestamp
					))}
				</div>
			) : (
				<p>No documents found for the user.</p>
			)}

			{/* Box for adding a new document */}
			<div>
				<h2 className='add-document-box'>
					Add New Document
					<Link to='/Upload'>
						<button>Add Document</button>
					</Link>
				</h2>
			</div>
		</div>
	);
};

// Set default props
View.defaultProps = {
	userId: 'user123',
};

export default View;
