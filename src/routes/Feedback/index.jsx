import "../Review/style.css";
import "./style.css";
import { useLoaderData, useNavigate } from "react-router-dom";
// Components
import ActionButton from "../../components/ActionButton";
import Navbar from "../../components/Navbar";
import SuggestionCard from "../../components/SuggestionCard";
// Firebase
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";

export const loader = async ({ params: { id } }) => {
  const feedbackRef = doc(db, "feedback", id);
  const feedback = (await getDoc(feedbackRef)).data();
  const suggestions = await Promise.all(
    feedback.suggestions.map(async (id) => {
      return (await getDoc(doc(db, "suggestions", id))).data();
    })
  );

  return { feedback, suggestions };
};

const Feedback = () => {
  const { feedback, suggestions } = useLoaderData();
  const { blurt, suggestions: suggestionIds } = feedback;
  const navigate = useNavigate();

  return (
    <main>
      <Navbar />
      <section className="main">
        <textarea disabled={true} id="notebox" value={blurt}></textarea>
        <aside className="blurt-wrapper">
          <div className="blurt-suggest">
            <h1 className="blurt-header">Review your blurt.</h1>
            <div className="suggestion-wrapper">
              {suggestions.map((s) => (
                <SuggestionCard key={s.id} suggestion={s} />
              ))}
            </div>
          </div>
          <ActionButton
            label={"Finish reviewing"}
            onClick={() => navigate("/view")}
          />
        </aside>
      </section>
    </main>
  );
};

export default Feedback;
