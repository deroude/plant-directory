import React, { useEffect, useState } from 'react';

import { CircularProgress, Container, ImageList, ImageListItem, Input, Paper, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './App.css';
import { Filter, getFilters } from './services/filter.service';
import { Result, search } from './services/search.service';

function App() {

  const [filters, setFilters] = useState<Filter[]>([]);

  const [results, setResults] = useState<Result[]>([]);

  const [selected, setSelected] = useState<{ [key: string]: string }>({});

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getFilters().then(filters=>{
      setFilters(filters);
      setLoading(false);
    });
  }, [])

  useEffect(() => {
    if (Object.keys(selected).length > 1) {
      setLoading(true);
      search(selected).then(results=>{
        setResults(results);
        setLoading(false);
      })
    }
  }, [selected])

  const handleFilterChange = (filterId: string) => {
    return (event: any) => {
      const updated = { ...selected };
      updated[filterId] = event.target.value;
      setSelected(updated);
    }
  }

  const renderFilters = () => filters.map(
    f => <Paper className='item' key={f.id}>
      <FormControl fullWidth>
        <InputLabel>{f.label}</InputLabel>
        {f.options ? <Select
          value={selected[f.id] || ''}
          label={f.label}
          onChange={handleFilterChange(f.id)}
        >
          {f.options.map(fo => <MenuItem value={fo.id} key={`${f.id}-${fo.id}`}>{fo.label}</MenuItem>)}
        </Select> :
          <Input type='text' onInput={handleFilterChange(f.id)}></Input>
        }
      </FormControl>
    </Paper>
  )

  const renderResults = () => <ImageList>
    {results.map(r => <ImageListItem key={r.id}></ImageListItem>)}
  </ImageList>

  return <Container maxWidth="sm" className="main">
    <Typography component='h1' className='title'>
      Lumea verde
    </Typography>
    {renderFilters()}
    {results.length ? renderResults() : <></>}
    {loading && <CircularProgress className='progress' size={60}></CircularProgress>}
  </Container>
}

export default App;
