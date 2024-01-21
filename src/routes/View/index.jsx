// View.jsx
import { format } from "date-fns";

import { useState, useEffect } from "react";
import "./View.css";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db, auth } from "../../../firebase"; // Assuming auth is the Firebase authentication instance
// React Icons
import { FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const View = () => {
  const [userDocuments, setUserDocuments] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

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
      const q = query(collection(db, "notes"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);

      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });

      setUserDocuments(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  return (
    <div className="view-wrapper">
      <Navbar />
      <div className="view-container">
        <h1 className="view-h1">Notes</h1>
        <div className="view-grid">
          <div className="add-document-box" onClick={() => navigate("/upload")}>
            <h2>Add New Document</h2>
            <FiPlusCircle size={50} />
          </div>
          {userDocuments.length > 0 ? (
            userDocuments.map((document) => (
              <div
                key={document.id}
                className="document-box"
                onClick={() => {
                  navigate(`/view/${document.id}`);
                }}
              >
                <p className="view-document-title">{document.title}</p>

                <div className="next-study-date">
                  <strong className="view-heading">Next Study Date:</strong>
                  <span>
                    {document.nextStudy
                      ? format(document.nextStudy.toDate(), "MM/dd/yyyy")
                      : "Not available"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No documents found for the user.</p>
          )}
        </div>
        {/* Box for adding a new document */}
      </div>
    </div>
  );
};

export default View;
