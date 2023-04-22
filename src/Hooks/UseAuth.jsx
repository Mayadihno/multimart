import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { auth } from "../Firebase/firebaseConfig";

const UseAuth = () => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return {
    currentUser,
  };
};

export default UseAuth;
