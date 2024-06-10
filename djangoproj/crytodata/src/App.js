import React, { useEffect, useState } from 'react';
import './App.css';
import NavigationBar from '../src/components/NavigationBar';

// Importing Material-UI components
import { Button, FormControl, MenuItem, Select, Typography } from '@mui/material';

function App() {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedPath, setSelectedPath] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.50:8001/api/filenames/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setDropdownOptions(result.dropdown_options);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleFileSelect = (e) => {
    setSelectedPath(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPath) {
      // Set the source of the iframe to the selected path
      const iframe = document.getElementById('resultFrame');
      iframe.src = `http://192.168.1.50:8000/${selectedPath}`;
    } else {
      alert('Please select a file.');
    }
  };

  return (
    <div className="App">
      <NavigationBar />
      <div className="container">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <Typography className="label_item">Select a File:</Typography>
            <FormControl>
              <Select
                labelId="filenames-label"
                id="filenames"
                name="filenames"
                value={selectedPath}
                onChange={handleFileSelect}
                className="form-select"
                style={{ width: '200px', height: '50px' }} 
              >
                <MenuItem value="">Select an option</MenuItem>
                {dropdownOptions.map((option, index) => (
                  <MenuItem key={index} value={option.path.split('\\').join('/').split('/').slice(-1)[0]}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" className="form-submit" style={{width:"200px", marginLeft: '20px',top:'5px'}}>Submit</Button>
          </div>
          {error && <Typography style={{ color: 'red' }}>Error: {error}</Typography>}
        </form>
        <iframe id="resultFrame" title="Result Frame" className="result-frame" src="" width="100%" height="600px"></iframe>
      </div>
    </div>
  );
}

export default App;
