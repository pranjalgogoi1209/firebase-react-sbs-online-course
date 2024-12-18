import React, { useState } from "react";

import TestRealTimeDataBase from "./components/01-testRealTimeDataBase/TestRealTimeDataBase";
import AddRealTimeDataBase from "./components/02-addRealTimeDataBase/AddRealTimeDataBase";
import RetrieveRealTimeDatabase from "./components/03-retrieveRealTimeDatabase/RetrieveRealTimeDatabase";

export default function App() {
  const [toBeUpdatedRealTimeDB, setToBeUpdatedRealTimeDB] = useState({});

  return (
    <div>
      <TestRealTimeDataBase />

      <AddRealTimeDataBase
        toBeUpdatedRealTimeDB={toBeUpdatedRealTimeDB}
        setToBeUpdatedRealTimeDB={setToBeUpdatedRealTimeDB}
      />

      <RetrieveRealTimeDatabase
        toBeUpdatedRealTimeDB={toBeUpdatedRealTimeDB}
        setToBeUpdatedRealTimeDB={setToBeUpdatedRealTimeDB}
      />
    </div>
  );
}
