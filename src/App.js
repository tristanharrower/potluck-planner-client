import {
  Routes,
  Route
} from "react-router-dom";
import Auth from './components/authorization/Auth'
import HomePage from './components/homepage/HomePage';
import { useState } from 'react';


function App() {
  
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <Routes>

      <Route path="/" 
      element={<HomePage 
      isLoggedIn={isLoggedIn} 
      setIsLoggedIn={setIsLoggedIn}/>}/>

      <Route path="auth" 
      element={<Auth 
      isLoggedIn={isLoggedIn} 
      setIsLoggedIn={setIsLoggedIn}/>} />
      <Route path="*" element={<Auth />} />

  </Routes>
  );
}

export default App;
