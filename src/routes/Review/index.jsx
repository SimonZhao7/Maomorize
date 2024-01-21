import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Components
import Navbar from "../../components/Navbar";
import ActionButton from "../../components/ActionButton";
// Firebase
import { db } from "../../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// OpenAI
import OpenAI from "openai";

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

const Review = () => {
  const [blurt, setBlurt] = useState("");
  const [loading, setLoading] = useState(false);
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
    const oompletion = await openai.chat.completions.create({
      messages: [
        ...systemMessages,
        {
          content: `Give me suggestions for this blurt:
        Blurt:
        ${blurt}
        Notes:
        Supervised learning is the most common type of machine learning. In supervised learning, the algorithm is trained on a dataset of labeled examples. Each example in the dataset consists of an input and an output. The algorithm learns to map the inputs to the outputs so that it can make predictions on new, unseen data. Supervised learning is often used for tasks such as classification, regression, and forecasting.

        Unsupervised learning is used when you have a dataset of unlabeled data. In unsupervised learning, the algorithm is not given any guidance on what the data represents. The algorithm must instead find patterns and structure in the data on its own. Unsupervised learning is often used for tasks such as clustering, dimensionality reduction, and anomaly detection.

        Reinforcement learning is a type of machine learning in which the algorithm learns by interacting with its environment. The algorithm is given a set of actions that it can take, and it receives rewards or penalties for its actions. The algorithm learns to take the actions that are most likely to result in rewards. Reinforcement learning is often used for tasks such as robotics, game playing, and control systems.
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

    const response = JSON.parse(oompletion.choices[0].message.content);
    const feedbackPath = collection(db, "feedback");

    const ids =
      (await Promise.all(response.suggestions.map(createSuggestion))) ?? [];

    const doc = await addDoc(feedbackPath, {
      userId: "user123",
      noteId: "note123",
      blurt,
      suggestions: ids,
      created: serverTimestamp(),
    });

    navigate(`/feedback/${doc.id}`);
    setLoading(false);
  };

  return (
    <main>
      <Navbar />
      <section className="main">
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
