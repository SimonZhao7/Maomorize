import "./style.css";

const Spinner = ({ size, color }) => {
  return (
    <div
      className="spinner"
      style={{ width: `${size}px`, height: `${size}px`, borderTopColor: color }}
    >
      &nbsp;
    </div>
  );
};

export default Spinner;
