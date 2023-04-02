import React, { useState } from 'react';

import { Container, Paper } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './App.css';

const locations = [
  { id: 'forest', label: 'Pădure' },
  { id: 'plain', label: 'Câmpie' },
  { id: 'riverbed', label: 'Luncă' }
]

function App() {

  const [location, setLocation] = useState()

  const handleLocationChange = (event:any) => {
    setLocation(event.target.value);
  };

  return <Container maxWidth="sm" className="main">
    <Paper className='item'>
      <FormControl fullWidth>
        <InputLabel>Locație</InputLabel>
        <Select
          value={location}
          label="Locație"
          onChange={handleLocationChange}
        >
          {locations.map(lo => <MenuItem value={lo.id} key={lo.id}>{lo.label}</MenuItem>)}
        </Select>
      </FormControl>
    </Paper>
  </Container>
}

export default App;
