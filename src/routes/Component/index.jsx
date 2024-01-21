import "./style.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../../../firebase";

const Component = () => {
  const [queryParams, _] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetch(
          `http://127.0.0.1:5001/maomorize-b2ccb/us-central1/accessToken?uid=${
            user.uid
          }&code=${queryParams.get("code")}`
        );
        navigate("/view");
      }
    });

    return () => unsub();
  }, []);

  return (
    <div>
      <h1>Component</h1>
    </div>
  );
};

export default Component;
