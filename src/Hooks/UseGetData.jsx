import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase/firebaseConfig";

const UseGetData = (collectioName) => {
  const [data, setData] = useState([]);
  const collectionRef = collection(db, collectioName);

  const getData = async () => {
    const data = await getDocs(collectionRef);
    setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, setData };
};

export default UseGetData;
