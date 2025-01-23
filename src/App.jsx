import React, { useState } from "react";

import TestRealTimeDataBase from "./components/01-testRealTimeDataBase/TestRealTimeDataBase";
import AddRealTimeDataBase from "./components/02-addRealTimeDataBase/AddRealTimeDataBase";
import RetrieveRealTimeDatabase from "./components/03-retrieveRealTimeDatabase/RetrieveRealTimeDatabase";
import AddUpdateFirestore from "./components/04-addUpdateFirestore/AddUpdateFirestore";
import RetrieveDeleteFirestore from "./components/05-retrieveDeleteFirestore/RetrieveDeleteFirestore";
import Auth from "./components/06-auth/Auth";

export default function App() {
  const [toBeUpdatedRealTimeDB, setToBeUpdatedRealTimeDB] = useState({});
  const [toBeUpdatedFirestore, setToBeUpdatedFirestore] = useState({});

  return (
    <div style={{ padding: "20px", backgroundColor: "black" }}>
      <TestRealTimeDataBase />

      <AddRealTimeDataBase
        toBeUpdatedRealTimeDB={toBeUpdatedRealTimeDB}
        setToBeUpdatedRealTimeDB={setToBeUpdatedRealTimeDB}
      />

      <RetrieveRealTimeDatabase
        toBeUpdatedRealTimeDB={toBeUpdatedRealTimeDB}
        setToBeUpdatedRealTimeDB={setToBeUpdatedRealTimeDB}
      />

      <AddUpdateFirestore toBeUpdatedFirestore={toBeUpdatedFirestore} />

      <RetrieveDeleteFirestore
        setToBeUpdatedFirestore={setToBeUpdatedFirestore}
      />

      <Auth />
    </div>
  );
}
