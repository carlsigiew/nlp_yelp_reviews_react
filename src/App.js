import Header from "./components/Header";
import Navbar from "./components/Navbar";
import backgroundImage from './images/people_eating.png'
import SearchBox from "./components/SearchBox";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom';

function App() {
  return (
    <div >

      <Router>
        <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route exact path="/" element={<Home/>} />
            
          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
          <Route path="/dashboard" element={<Dashboard />} />
            
          {/* This route is for contactus component
          with exact path "/contactus", in 
          component props we passes the imported component*/}
          {/* <Route path="/contactus" component={ContactUs} /> */}
            
          {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
          {/* <Navigate to="/" /> */}
        </Routes>
        
      </Router>
      
    </div>
  );
}

export default App;
