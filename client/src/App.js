import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
