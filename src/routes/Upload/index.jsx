import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Upload.css";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
// Components
import Navbar from "../../components/Navbar";

const Upload = () => {
  const [inputText, setInputText] = useState("");
  const [title, setTitle] = useState("A new note");
  const [userId] = useState("user123"); // Replace 'user123' with the actual user ID
  const navigate = useNavigate();

  // Asynchronous function to handle the button click and save the input text
  const handleButtonClick = async () => {
    // You can perform any additional logic or validation here before saving
    const savedText = inputText;

    // Save the text to Firestore
    // Save the text to the 'notes' collection
    const notesCollection = collection(db, "notes");

    // Add a new document to the 'notes' collection with additional fields
    await addDoc(notesCollection, {
      userId: userId,
      title: title,
      text: savedText,
      dateCreated: serverTimestamp(),
      lastStudied: null, // Default value is null
      nextStudy: null, // Default value is null
      interval: 0, // Default value is 0
    });
    navigate("/view");
  };

  // Function to count words and characters
  const countWordsAndCharacters = () => {
    const words = inputText.split(/\s+/).filter((word) => word !== "").length;
    const characters = inputText.length;
    return { words, characters };
  };

  // Display word and character count
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
