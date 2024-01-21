// View.jsx

import { useState, useEffect } from 'react';
import './View.css';
import Navbar from "../../components/Navbar";
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db, auth } from '../../../firebase'; // Assuming auth is the Firebase authentication instance
import { Link } from 'react-router-dom';

const View = () => {
	const [userDocuments, setUserDocuments] = useState([]);
	const [userId, setUserId] = useState(null);

	
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				// User is signed in, get their UID
				setUserId(user.uid);
				fetchUserDocuments(user.uid);
			} else {
				// User is signed out, set userId to null or handle as needed
				setUserId(null);
				setUserDocuments([]);
			}
		});

		return () => unsubscribe(); // Cleanup the subscription
	}, []); // Effect runs once on component mount

	const fetchUserDocuments = async (uid) => {
		try {
			const q = query(collection(db, 'notes'), where('userId', '==', uid));
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

	return (
		<div className="view-wrapper">
		<Navbar/>
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
						// Change Text to studyNext after implementing the timestamp
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
						<button class="add-button"> + </button>
					</Link>
				</h2>
			</div>
		</div>
		</div>
	);
};

export default View;


