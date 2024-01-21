import "./style.css";
// Icons
import { IoInformationCircle } from "react-icons/io5";
import { CgDanger } from "react-icons/cg";

const SuggestionCard = ({ suggestion }) => {
  return (
    <div className="wrapper">
      <p>{suggestion.suggestion}</p>
      <div className="pill-wrapper">
        <div
          className={`pill ${
            suggestion.quote != null ? "fix-info" : "missing-info"
          }`}
        >
          {suggestion.quote != null ? (
            <>
              <IoInformationCircle size={25} /> Suggestion
            </>
          ) : (
            <>
              <CgDanger size={25} /> Missing Info
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;
