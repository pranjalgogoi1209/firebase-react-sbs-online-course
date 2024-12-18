import React, { useState, useEffect } from "react";

import { getDatabase, onValue, ref, set, remove } from "firebase/database";
import { app } from "../../Firebase";

export default function RetrieveRealTimeDatabase({
  toBeUpdatedRealTimeDB,
  setToBeUpdatedRealTimeDB,
}) {
  const [data, setData] = useState([]);

  // read data
  useEffect(() => {
    const db = getDatabase(app);
    onValue(ref(db, "teachers"), (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setData(data);
    });
  }, []);

  // delete data
  const handleDelete = (key) => {
    const db = getDatabase(app);
    const teacherRef = ref(db, "teachers/" + key);
    remove(teacherRef);
    // or
    // set(teacherRef, null);

    // console.log(key, "teacher deleted");
    if (key === toBeUpdatedRealTimeDB.teacherId) {
      setToBeUpdatedRealTimeDB("");
    }
  };

  console.log(data);

  return (
    <div style={{ backgroundColor: "lightpink" }}>
      <h1>03 - RetrieveRealTimeDatabase</h1>
      {data &&
        Object.keys(data).map((key) => (
          <ul key={key}>
            <li>id : {key}</li>
            <li>teacher name : {data[key].teacherName}</li>
            <li>phone number : {data[key].phoneNumber}</li>
            <hr />
            <button
              onClick={() =>
                setToBeUpdatedRealTimeDB({ ...data[key], teacherId: key })
              }
            >
              Update
            </button>{" "}
            <button onClick={() => handleDelete(key)}>Delete</button>
          </ul>
        ))}
    </div>
  );
}
