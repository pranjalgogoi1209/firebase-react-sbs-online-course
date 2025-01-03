import React, { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";

const DEFAULT_DATA = {
  name: "",
  phone: "",
};

export default function AddUpdateFirestore({ toBeUpdatedFirestore }) {
  const [formData, setFormData] = useState(DEFAULT_DATA);

  // update data
  useEffect(() => {
    if (toBeUpdatedFirestore) {
      setFormData(toBeUpdatedFirestore);
    }
  }, [toBeUpdatedFirestore]);

  // Fetch data from Firestore
  useEffect(() => {
    const collectionRef = collection(db, "users");
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const alldata = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(alldata);
    });
    return () => unsubscribe();
  }, []);

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    try {
      const collectionRef = collection(db, "users");

      if (toBeUpdatedFirestore) {
        // update
        const docRef = doc(collectionRef, toBeUpdatedFirestore.id);
        await updateDoc(docRef, {
          name: formData.name,
          phone: formData.phone,
        });
      } else {
        // create
        await addDoc(collectionRef, {
          name: formData.name,
          phone: formData.phone,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ backgroundColor: "lightblue", padding: "20px" }}>
      <h1>04 - AddUpdateFirestore</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </div>
        <br />
        <div>
          <label>Phone</label>
          <br />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
        </div>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
