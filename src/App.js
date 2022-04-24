import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { db } from './firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getDocs, query, where } from 'firebase/firestore';

function App() {
  const [newName, setNewName] = useState("");
  const [newPass, setNewPass] = useState("");
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { username: newName, password: newPass });
  }

  const checkUser = async () => {
    const q = query(collection(db, "users"), where("username", "==", newName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert("Not and existing user");
    }

    querySnapshot.forEach((doc) => {
      if (doc.get("password") == newPass) {
        alert("User found!");
      }
      else {
        alert("Password incorrect");
      }
    });
  }

  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getUsers();
  }, []);

  return (
    <div className="App">
      <div>
        <input placeholder='Username' onChange={(event) => { setNewName(event.target.value) }} />
        <input placeholder='Password' onChange={(event) => { setNewPass(event.target.value) }} />
      </div>
      <div>
        <button onClick={createUser}>Create User</button>
        <button onClick={checkUser}>Check User</button>
      </div>

    </div>
  );
}

export default App;
