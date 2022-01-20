import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Auth from './components/Auth'
import HomePage from './components/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="auth" element={<Auth />} />
  </Routes>
  );
}

export default App;
