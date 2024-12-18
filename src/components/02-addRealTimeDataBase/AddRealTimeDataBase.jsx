import React, { useEffect, useState } from "react";

import { getDatabase, ref, set, update } from "firebase/database";
import { app } from "../../Firebase";

export default function AddRealTimeDataBase({
  toBeUpdatedRealTimeDB,
  setToBeUpdatedRealTimeDB,
}) {
  const [formData, setFormData] = useState({
    teacherId: "",
    teacherName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (toBeUpdatedRealTimeDB) {
      console.log(toBeUpdatedRealTimeDB);

      setFormData(toBeUpdatedRealTimeDB);
    }
  }, [toBeUpdatedRealTimeDB]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    // firebase
    const db = getDatabase(app);
    const teacherRef = ref(db, "teachers/" + formData.teacherId);

    if (toBeUpdatedRealTimeDB) {
      // update
      update(teacherRef, {
        teacherName: formData.teacherName,
        phoneNumber: formData.phoneNumber,
      });
    } else {
      // add
      set(teacherRef, {
        teacherName: formData.teacherName,
        phoneNumber: formData.phoneNumber,
      });
    }

    setFormData({
      teacherId: "",
      teacherName: "",
      phoneNumber: "",
    });

    setToBeUpdatedRealTimeDB("");
  };
  return (
    <div style={{ backgroundColor: "lightgreen" }}>
      <h1>02 - AddRealTimeDataBase and UpdateRealTimeDatabase</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="teacherName">Teacher Id:</label>
          <br />
          <input
            type="text"
            id="teacherId"
            name="teacherId"
            placeholder="Enter teacher's id no."
            value={formData.teacherId}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="teacherName">Teacher Name:</label>
          <br />
          <input
            type="text"
            id="teacherName"
            name="teacherName"
            placeholder="Enter teacher's name"
            value={formData.teacherName}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <br />
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <button type="submit">
          {Object.keys(toBeUpdatedRealTimeDB).length !== 0 ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}
