import React from "react";
import { getDatabase, ref, set } from "firebase/database";

import app from "../../firebase-config";

export default function TestRealTimeDataBase() {
  // add test data
  const testRealTimeDataBase = (id, name, phone) => {
    try {
      console.log(id, name, phone);
      // firebase
      const db = getDatabase(app);
      set(ref(db, `users/${id}`), {
        name,
        phone,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ backgroundColor: "lightblue", padding: "20px" }}>
      <h1>01 - TestRealTimeDataBase d</h1>
      <button
        onClick={() =>
          testRealTimeDataBase("ifsh034nf2732", "Rizwan Ahmed", "8085636181")
        }
      >
        TestRealTimeDataBase
      </button>
    </div>
  );
}
