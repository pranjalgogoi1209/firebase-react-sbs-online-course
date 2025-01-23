import React from "react";
import { auth } from "../../firebase-config";

import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export default function Auth() {
  ``;

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };

  return (
    <div>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
}
