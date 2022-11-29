import Navbar from "./Navbar";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import backgroundImage from '../images/people_eating.png';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Dashboard from "./Dashboard";
const Home = () => {
    const businesses = [
      {"id":"SZU9c8V2GuREDN5KgyHFJw", "name":"Santa Barbara Shellfish Company"},
      {"id":"ORL4JE6tz3rJxVqkdKfegA", "name":"Gaylord Opryland Resort & Convention Center"},
      {"id":"W4ZEKkva9HpAdZG88juwyQ", "name":"Mr. B's Bistro"},
      {"id":"8uF-bhJFgT4Tn6DTb27viA", "name":"District Donuts Sliders Brew"},
      {"id":"UCMSWPqzXjd7QHq7v8PJjQ", "name":"Prep & Pastry"},
      {"id":"EQ-TZ2eeD_E0BHuvoaeG5Q", "name":"Milktooth"},
      {"id":"GBTPC53ZrG1ZBY3DT8Mbcw", "name":"Luke"},
      {"id":"g04aAvgol7IW8buqSbT4xA", "name":"Cafe Fleur De Lis"},
      {"id":"vN6v8m4DO45Z4pp8yxxF_w", "name":"Surrey's Café & Juice Bar"},
      {"id":"Zx7n8mdt8OzLRXVzolXNhQ", "name":"Milk and Honey Nashville"},
      {"id":"S2Ho8yLxhKAa26pBAm6rxA", "name":"Creole House Restaurant & Oyster Bar"},
      {"id":"TV81bpCQ6p6o4Hau5hk-zw", "name":"Hellas Restaurant"},
      {"id":"2KIDQyTh-HzLxOUEDqtDBg", "name":"Mazzaro's Italian Market"},
      {"id":"pSmOH4a3HNNpYM82J5ycLA", "name":"The Pancake Pantry"},
      {"id":"PY9GRfzr4nTZeINf346QOw", "name":"Peppermill Reno"},
      {"id":"EtKSTHV5Qx_Q7Aur9o4kQQ", "name":"Village Whiskey"},
      {"id":"M0r9lUn2gLFYgIwIfG8-bQ", "name":"Baileys' Range"},
      {"id":"nRKndeZLQ3eDL10UMwS2rQ", "name":"Ted Drewes"},
      {"id":"cXSyVvOr9YRN9diDkaWs0Q", "name":"Honey's Sit-N-Eat"},
      {"id":"Zi-F-YvyVOK0k5QD7lrLOg", "name":"Muriel's Jackson Square"},
      {"id":"DcBLYSvOuWcNReolRVr12A", "name":"Drago's Seafood Restaurant"},
      {"id":"j-qtdD55OLfSqfsWuQTDJg", "name":"Parc"},
      {"id":"mhrW9O0O5hXGXGnEYBVoag", "name":"Jacques-Imo's Cafe"}
  ]
  const navigate = useNavigate();

  return (

    <div style={{ backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh'}}><Navbar />
    <span className='business_span'>Select the business you would like to see the statistics for:</span>
    <Autocomplete
      disablePortal
      id="restaurant_names"
      options={businesses}
      clearOnEscape="True"
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} label="Restaurants" />}
      sx={{
        "& .MuiInputLabel-root": {color: 'black'},//styles the label
        "& .MuiOutlinedInput-root": {
          "& > fieldset": { borderColor: "black" },
        },
      }}
      size='medium'
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          console.log(event)
          event.defaultMuiPrevented = true;
          // your handler code
        }
      }}
      onChange={(event, newValue) => {
        console.log(JSON.stringify(newValue, null, ' '));
        navigate('/dashboard', {state:{id:newValue.id}})
      }}
      
    />
    
    </div>
  )
}

export default Home