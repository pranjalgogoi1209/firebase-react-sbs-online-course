import React from "react";
import { getDatabase, ref, set } from "firebase/database";

import { app } from "../../Firebase";

export default function TestRealTimeDataBase() {
  const testRealTimeDataBase = (id, name, phoneNumber) => {
    console.log(id, name, phoneNumber);

    // firebase
    const db = getDatabase(app);
    set(ref(db, "users/" + id), {
      username: name,
      phoneNumber: phoneNumber,
    });
  };
  return (
    <div style={{ backgroundColor: "lightblue" }}>
      <h1>01 - TestRealTimeDataBase</h1>
      <button
        onClick={() =>
          testRealTimeDataBase("ifsh034nf2730", "upama bora", "8085636185")
        }
      >
        TestRealTimeDataBase
      </button>
    </div>
  );
}
