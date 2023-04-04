import React, { useEffect, useState } from 'react';

import { CircularProgress, Container, ImageList, ImageListItem, ImageListItemBar, Input, Paper, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './App.css';
import { Filter, getFilters } from './services/filter.service';
import { Result, search } from './services/search.service';
import { sync } from './services/sync.service';

function App() {

  const getSeason = ():string => {
    return 'spring';
  }

  const [filters, setFilters] = useState<Filter[]>([]);

  const [results, setResults] = useState<Result[]>([]);

  const [selected, setSelected] = useState<{ [key: string]: string }>({ season: getSeason() });

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    sync();
    getFilters().then(filters => {
      setFilters(filters);
      setLoading(false);
    });
  }, [])

  useEffect(() => {
    if (Object.keys(selected).length > 1) {
      setLoading(true);
      search(
        Object.entries(selected)
          .map(s => ({ filter: filters.find(f => f.id === s[0])!, value: s[1] }))
      )
        .then(results => {
          setResults(results);
          setLoading(false);
        })
    }
  }, [selected, filters])

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
    {results.map(r => <ImageListItem key={r.id}>
      <img
        src={r.photoUrl}
        alt={r.label}
        loading="lazy"
      />
      <ImageListItemBar
        title={r.label}
        subtitle={r.id}
        position="below"
      />
    </ImageListItem>)}
  </ImageList>

  /**
   * <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>by: {item.author}</span>}
              position="below"
            />
   */

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
