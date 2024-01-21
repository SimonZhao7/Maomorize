import { db } from "../../../firebase";
import { useState } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useLoaderData, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./style.css";

export const loader = async ({ params: { id } }) => {
  const noteDoc = await getDoc(doc(db, "notes", id));
  return { note: noteDoc.data(), id };
};

const ViewNote = () => {
  const { note, id } = useLoaderData();
  const { text, lastStudied } = note;
  const [inputText, setInputText] = useState(text);
  const [title, setTitle] = useState(note.title);
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    console.log("hi");
    await updateDoc(doc(db, "notes", id), {
      title: title,
      text: inputText,
    });
    navigate("/view");
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
          <div className="note-actions-wrapper">
            <button
              className="view-note-btn"
              onClick={() => {
                navigate(`/review/${id}`);
              }}
            >
              {lastStudied == null ? "Begin studying" : "Continue studying"}
            </button>
            <button onClick={handleButtonClick} className="view-note-btn">
              Edit Note
            </button>
          </div>
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

export default ViewNote;
