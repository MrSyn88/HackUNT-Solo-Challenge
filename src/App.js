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
      alert("Not an existing user");
      console.log("user: \"" + newName + "\" not found");
    }

    querySnapshot.forEach((doc) => {
      if (doc.get("password") == newPass) {
        alert("User found!");
        console.log("Password matches for user: \"" + newName + "\"");
      }
      else {
        alert("Password incorrect");
        console.log("Password does not match for user: \"" + newName + "\"");
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
      <nav class="navbar navbar-dark bg-primary">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">HackUNT Solo Challenge</span>
        </div>
      </nav>
      <br></br>
      <div>
        <input placeholder='Username' onChange={(event) => { setNewName(event.target.value) }} />
      </div>
      <div>
        <input placeholder='Password' onChange={(event) => { setNewPass(event.target.value) }} />
      </div>
      <div>
        <button type="button" class="btn btn-primary" onClick={createUser}>Create User</button>
        <button type="button" class="btn btn-primary" onClick={checkUser}>Check User</button>
      </div>
      <br></br>
      <br></br>
      <a href="https://ibb.co/L92fcTY"><img src="https://i.ibb.co/8PSVfyN/jose-gregorio-nico-nico-nii.gif" alt="jose-gregorio-nico-nico-nii" border="0"></img></a>
    </div>
  );
}

export default App;
