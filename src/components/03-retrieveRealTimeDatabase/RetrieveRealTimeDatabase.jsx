import React, { useState, useEffect } from "react";

import app from "../../firebase-config";
import { getDatabase, onValue, ref, set, remove } from "firebase/database";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";

export default function RetrieveRealTimeDatabase({
  toBeUpdatedRealTimeDB,
  setToBeUpdatedRealTimeDB,
}) {
  const [data, setData] = useState([]);

  // read data
  useEffect(() => {
    try {
      const db = getDatabase(app);
      const teacherRef = ref(db, "teachers");
      onValue(teacherRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        setData(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  // delete data
  const handleDelete = async (key) => {
    try {
      const db = getDatabase(app);
      const teacherRef = ref(db, "teachers/" + key);

      const storage = getStorage(app);
      const imageRef = storageRef(storage, `photos/${key}`);

      await deleteObject(imageRef);
      console.log(key, "photo deleted");

      await remove(teacherRef);
      console.log(key, "teacher deleted");

      if (key === toBeUpdatedRealTimeDB.id) {
        setToBeUpdatedRealTimeDB("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(data);

  return (
    <div style={{ backgroundColor: "lightpink", padding: "20px" }}>
      <h1>03 - get/delete real time database and delete storage</h1>
      {data &&
        Object.keys(data).map((key) => (
          <ul key={key}>
            <li>id : {key}</li>
            <li>
              <img src={data[key].photo} width={50} height={50} />
            </li>
            <li>teacher name : {data[key].name}</li>
            <li>phone number : {data[key].phone}</li>
            <hr />
            <button
              onClick={() =>
                setToBeUpdatedRealTimeDB({ ...data[key], id: key })
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
