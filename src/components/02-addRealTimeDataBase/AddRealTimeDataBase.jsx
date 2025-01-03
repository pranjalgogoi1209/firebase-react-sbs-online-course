import React, { useEffect, useState } from "react";

import { getDatabase, ref, set, update } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import app from "../../firebase-config";

export default function AddRealTimeDataBase({
  toBeUpdatedRealTimeDB,
  setToBeUpdatedRealTimeDB,
}) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
    photo: "",
  });
  const [uploadedFile, setUploadedFile] = useState(null);

  // update data
  useEffect(() => {
    if (toBeUpdatedRealTimeDB) {
      setFormData(toBeUpdatedRealTimeDB);
    }
  }, [toBeUpdatedRealTimeDB]);

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // handle image upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
  };

  console.log(uploadedFile);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    if (!uploadedFile && !formData.photo) {
      alert("Please upload an image");
      return new Error("Please upload an image");
    }

    // firebase
    try {
      const db = getDatabase(app);
      const teacherRef = ref(db, `teachers/${formData.id}`);

      const storage = getStorage(app);
      const imageRef = storageRef(storage, `photos/${formData.id}`);
      const snapshot = await uploadBytes(imageRef, uploadedFile);
      const url = await getDownloadURL(snapshot.ref);

      if (toBeUpdatedRealTimeDB) {
        // update
        update(teacherRef, {
          name: formData.name,
          phone: formData.phone,
          photo: url,
        });
      } else {
        // add
        set(teacherRef, {
          name: formData.name,
          phone: formData.phone,
          photo: url,
        });
      }
    } catch (err) {
      console.log(err);
    }

    setFormData({
      id: "",
      name: "",
      phone: "",
      photo: "",
    });

    setUploadedFile(null);

    setToBeUpdatedRealTimeDB("");
  };

  return (
    <div style={{ backgroundColor: "lightgreen", padding: "20px" }}>
      <h1>
        02 - create/update realtime database and create/update/get Storage
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="teacherName">Teacher Id:</label>
          <br />
          <input
            type="text"
            id="teacherId"
            name="id"
            placeholder="Enter teacher's id no."
            value={formData.id}
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
            name="name"
            placeholder="Enter teacher's name"
            value={formData.name}
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
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="teacherImage">Teacher Image:</label>
          <br />
          <input
            type="file"
            id="teacherImage"
            name="photo"
            onChange={handlePhotoChange}
          />
          <img
            src={
              uploadedFile ? URL.createObjectURL(uploadedFile) : formData.photo
            }
            width={50}
            height={50}
          />
        </div>
        <br />
        <button type="submit">
          {Object.keys(toBeUpdatedRealTimeDB).length !== 0
            ? "Update"
            : "Create"}
        </button>
      </form>
    </div>
  );
}
