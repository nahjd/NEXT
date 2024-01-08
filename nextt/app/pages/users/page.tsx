"use client";
import React, { useEffect, useState } from "react";
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
interface Fire {
  id: string;
  email: string;
  name: string;
  password: string;
}

const Users = (props: Props) => {
  const [fireStoreData, setFireStoreData] = useState<Fire[]>([]);

  const getDataFromFirestore = async () => {
    const db = getFirestore(app);

    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const data: Fire[] = [];

      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          email: doc.data().email,
          name: doc.data().name,
          password: doc.data().password,
        });
      });

      setFireStoreData(data);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  useEffect(() => {
    getDataFromFirestore();
  }, []);

  //   const addDataToFirestore = async () => {
  //     try {
  //       const data = { email: "seid@gmail.com", name: "seid", password: "12345" };
  //       const db = getFirestore(app);
  //       await setDoc(doc(collection(db, "users")), data);
  //       getDataFromFirestore();
  //     } catch (error) {
  //       console.error("Error adding document: ", error);
  //     }
  //   };

  const deleteDataFromFirestore = async (id: string) => {
    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, "users", id));
      getDataFromFirestore();
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {fireStoreData.map((elem) => (
          <li key={elem.id}>
            {elem.email} <br />
            {elem.name} <br />
            {elem.password} <br />
            <button
              onClick={() => deleteDataFromFirestore(elem.id)}
              style={{
                backgroundColor: "red",
                color: "white",
                fontSize: "15px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {/* <button onClick={addDataToFirestore}>Add Data</button> */}
    </div>
  );
};

export default Users;
