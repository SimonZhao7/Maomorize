import "./style.css";
import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
// Components
import Navbar from "../../components/Navbar";
import ActionButton from "../../components/ActionButton";
// Firebase
import { db } from "../../../firebase";
import {
  addDoc,
  collection,
  updateDoc,
  getDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
// OpenAI
import OpenAI from "openai";
import { getNextInterval } from "../../util/nextInterval";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

const systemMessages = [
  {
    content:
      "Your job is to review the text under 'Blurt:' and compare it with the notes from 'Notes'. Provide suggestions on how the blurt can express the concepts better and highlight factually incorrect information. Also note missing sections in the blurt.",
    role: "system",
  },
  {
    content: `Please output into a json format. This is the type of format I want: 
    {
        'suggestions': [
            [
                <string | null, exact portion of text where suggestion is directed to or null if this is missing information>,  
                <string, the suggestion you have for the text>,
            ]
        ]
    }
    `,
    role: "system",
  },
];

export const loader = async ({ params: { id } }) => {
  const noteDoc = await getDoc(doc(db, "notes", id));

  return { id: noteDoc.id, ...noteDoc.data() };
};

const Review = () => {
  const [blurt, setBlurt] = useState("");
  const [loading, setLoading] = useState(false);
  const { id, text, interval } = useLoaderData();
  const navigate = useNavigate();

  const createSuggestion = async ([quote, suggestion]) => {
    const suggestionPath = collection(db, "suggestions");
    const doc = await addDoc(suggestionPath, {
      quote,
      suggestion,
    });
    return doc.id;
  };

  const reviewSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    const completion = await openai.chat.completions.create({
      messages: [
        ...systemMessages,
        {
          content: `Give me suggestions for this blurt:
        Blurt:
        ${blurt}
        Notes:
        ${text}
        `,
          role: "user",
        },
      ],
      model: "gpt-4-1106-preview",
      response_format: {
        type: "json_object",
      },
      max_tokens: 1000,
    });

    const response = JSON.parse(completion.choices[0].message.content);
    const feedbackPath = collection(db, "feedback");

    const ids =
      (await Promise.all(response.suggestions.map(createSuggestion))) ?? [];

    const feedbackDoc = await addDoc(feedbackPath, {
      userId: "user123",
      noteId: "note123",
      blurt,
      suggestions: ids,
      created: serverTimestamp(),
    });

    const nxtInterval = getNextInterval(interval);
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const nextStudy = new Date(date.getTime() + 86400000 * nxtInterval);

    await updateDoc(doc(db, "notes", id), {
      interval: nxtInterval,
      lastStudied: serverTimestamp(),
      nextStudy,
    });

    navigate(`/feedback/${feedbackDoc.id}`);
    setLoading(false);
  };

  return (
    <main>
      <Navbar />
      <section className="review_main">
        <textarea
          disabled={loading}
          id="notebox"
          placeholder="Enter your blurt here..."
          value={blurt}
          onChange={(e) => setBlurt(e.target.value)}
        ></textarea>
        <aside className="blurt-wrapper">
          <div>
            <h1 className="blurt-header">Blurt it out.</h1>
            <h3 className="blurt-desc">
              We’ll use AI to analyze your response when you’re done
            </h3>
          </div>
          <ActionButton
            label={"Submit for review"}
            onClick={reviewSubmission}
            loading={loading}
          />
        </aside>
      </section>
    </main>
  );
};

export default Review;
