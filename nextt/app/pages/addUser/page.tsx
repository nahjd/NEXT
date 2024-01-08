"use client";
import React, { useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import app from "./../../firebase/config";

type Props = {};

function Adduser(props: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const addUser = async () => {
    let data = { name: name, password: password, email: email };
    const db = getFirestore(app);
    const usersCollection = collection(db, "users");
    await setDoc(doc(usersCollection), data);
  };

  //   const addDataToFirestore = async () => {
  //     try {
  //       let data = { name: name, password: password, email: email };
  //       const db = getFirestore(app);
  //       await setDoc(doc(collection(db, "users")), data);
  //       getDataFromFirestore();
  //     } catch (error) {
  //       console.error("Error adding document: ", error);
  //     }
  //   };

  return (
    <>
      <button>
        <a href="/pages/users">Users</a>
      </button>

      <h1>AddUser</h1>

      <form action="">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={name}
          placeholder="Enter the email"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter the password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Enter the email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
      </form>
      <button onClick={addUser}>Add User</button>
    </>
  );
}

export default Adduser;
