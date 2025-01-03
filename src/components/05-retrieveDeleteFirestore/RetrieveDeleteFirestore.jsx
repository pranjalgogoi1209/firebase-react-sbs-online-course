import React, { useState, useEffect } from "react";

import { db } from "../../firebase-config";
import {
  getDocs,
  deleteDoc,
  doc,
  collection,
  onSnapshot,
} from "firebase/firestore";

export default function RetrieveDeleteFirestore({ setToBeUpdatedFirestore }) {
  const [data, setData] = useState([]);

  // read data
  useEffect(() => {
    const getData = async () => {
      try {
        const collectionRef = collection(db, "users");
        onSnapshot(collectionRef, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log(data);
          setData(data);
        });
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "snapshawt-category"),
      (snapshot) => {
        const alldata = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("a");
        alldata.sort((a, b) => b.featuredRank - a.featuredRank);
        setCategories(alldata);
        console.log(alldata, "add data");
      }
    );
    return () => unsubscribe();
  }, []);

  // delete data
  const handleDelete = async (id) => {
    try {
      console.log("deleted", id);

      const collectionRef = collection(db, "users");
      const docRef = doc(collectionRef, id);
      await deleteDoc(docRef);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(data);

  return (
    <div style={{ backgroundColor: "lightpink", padding: "20px" }}>
      <h1>03 - get/delete real time database and delete storage</h1>
      {data &&
        data.map((element, key) => (
          <ul key={key}>
            <li>id : {Number(key) + 1}</li>
            <li>user name : {element.name}</li>
            <li>phone number : {element.phone}</li>
            <hr />
            <button onClick={() => setToBeUpdatedFirestore(element)}>
              Update
            </button>
            <button onClick={() => handleDelete(element.id)}>Delete</button>
          </ul>
        ))}
    </div>
  );
}
