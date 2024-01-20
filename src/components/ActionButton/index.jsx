import "./style.css";
import Spinner from "../Spinner";

const ActionButton = ({ onClick, label, loading }) => {
  return (
    <button className="action-btn" onClick={onClick} disabled={loading}>
      {loading ? <Spinner size={30} color="white" /> : label}
    </button>
  );
};

export default ActionButton;
