import { useState, useEffect } from "react";
import "./Upload.css";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../../firebase";
import Navbar from "../../components/Navbar";

const Upload = () => {
  const [inputText, setInputText] = useState("");
  const [title, setTitle] = useState("A new note");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

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
      const notesCollection = collection(db, "notes");

      await addDoc(notesCollection, {
        userId: userId,
        title: title,
        text: savedText,
        dateCreated: serverTimestamp(),
        lastStudied: null,
        nextStudy: null,
        interval: 0,
      });
      navigate("/view");
      console.log("Text saved to Firestore:", savedText);
    } else {
      console.error("User not logged in.");
    }
  };

  const countWordsAndCharacters = () => {
    const words = inputText.split(/\s+/).filter((word) => word !== "").length;
    const characters = inputText.length;
    return { words, characters };
  };

  const { words, characters } = countWordsAndCharacters();

  return (
    <main>
      <Navbar />
      <section className="upload-bg">
        <div className="upload-title-bar">
          <input
            type="text"
            className="upload-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            //! add a set title userid function
          />
          <button className="upload_button" onClick={handleButtonClick}>
            Create Note
          </button>
        </div>
        <textarea
          id="text"
          className="upload-editor"
          value={inputText}
          placeholder="Enter your notes here..."
          onChange={(e) => setInputText(e.target.value)}
        />
        {/* Display word and character count */}
        <div className="upload-doc-info">
          <p className="upload_p">Word Count: {words}</p>
          <p className="upload_p">Character Count: {characters}</p>
        </div>
      </section>
    </main>
  );
};

export default Upload;
