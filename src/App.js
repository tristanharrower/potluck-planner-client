import {
  Routes,
  Route
} from "react-router-dom";
import Auth from './components/authorization/Auth'
import HomePage from './components/homepage/HomePage';
import { useState } from 'react';


function App() {
  const [user, setUser] = useState({})
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <Routes>

      <Route path="/" 
      element={<HomePage 
      isLoggedIn={isLoggedIn} 
      setIsLoggedIn={setIsLoggedIn}
      user={user}/>}/>

      <Route path="auth" 
      element={<Auth 
      isLoggedIn={isLoggedIn} 
      setIsLoggedIn={setIsLoggedIn}
      setUser={setUser}
      user={user}/>} />
      <Route path="*" element={<Auth />} />

  </Routes>
  );
}

export default App;
