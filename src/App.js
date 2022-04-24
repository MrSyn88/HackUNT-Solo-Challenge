import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { db } from './firebase';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { getDocs, query, where, doc } from 'firebase/firestore';

function App() {
  const [newName, setNewName] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newLat, setNewLat] = useState(0);
  const [newLong, setNewLong] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [logId, setLogId] = useState("");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { username: newName, password: newPass, latitude: newLat, longitude: newLong });
  }

  const checkUser = async () => {
    const q = query(collection(db, "users"), where("username", "==", newName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert("Not an existing user");
      console.log("user: \"" + newName + "\" not found");
    }

    querySnapshot.forEach((doc) => {
      if (doc.get("password") === newPass) {
        console.log("Password matches for user: \"" + newName + "\"");
        setLogId(doc.id);
        alert("Please choose allow and your location will be logged");
        getLocation();
      }
      else {
        alert("Password incorrect");
        console.log("Password does not match for user: \"" + newName + "\"");
      }
    });
  };

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(logPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser");
      console.log("Geolocation is not supported by this browser");
    }
  };

  const logPosition = async (position) => {
    const userDoc = doc(db, "users", logId);
    setNewLat(position.coords.latitude);
    setNewLong(position.coords.longitude);
    const newFields = { latitude: newLat, longitude: newLong };
    await updateDoc(userDoc, newFields);
  };

  const showError = async (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation");
        console.log("User denied the request for Geolocation");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable");
        console.log("Location information is unavailable");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out");
        console.log("The request to get user location timed out");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred");
        console.log("An unknown error occurred");
        break;
    }
  };

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
          <span class="navbar-brand mb-0 h1">Nico Nico Nii Location Logger</span>
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
        <button type="button" class="btn btn-primary" onClick={checkUser}>Log My Location</button>
      </div>
      <br></br>
      <br></br>
      <a href="https://ibb.co/L92fcTY"><img src="https://i.ibb.co/8PSVfyN/jose-gregorio-nico-nico-nii.gif" alt="jose-gregorio-nico-nico-nii" border="0"></img></a>
    </div>
  );
}

export default App;
