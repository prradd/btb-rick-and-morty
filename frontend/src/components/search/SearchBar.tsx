'use client';

import React, { useState, useEffect } from 'react';
import {
  TextField, List, ListItem, ListItemText, Paper, Grid, Button,
} from '@mui/material';
import { styled } from '@mui/system';

interface SearchBarProps<T> {
  fetchData: (query: string) => Promise<T[]>;
  onSearch: (results: T[]) => void;
  getSuggestionLabel: (item: T) => string;
  placeholder: string;
}

const SuggestionListItem = styled(ListItem)({
  cursor: 'pointer',
});

function SearchBar<T extends unknown>({
  fetchData, onSearch, getSuggestionLabel, placeholder,
}: SearchBarProps<T>) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<T[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue.length > 0) {
        try {
          const results = await fetchData(inputValue);
          setSuggestions(results.slice(0, 5));
        } catch {
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions().catch(() => {
      setSuggestions([]);
    });
  }, [inputValue, fetchData]);

  const handleSearch = async () => {
    try {
      const results = await fetchData(inputValue);
      onSearch(results);
    } catch {
      onSearch([]);
    }
    setSuggestions([]);
  };

  const handleSelectSuggestion = async (suggestion: T) => {
    setInputValue(getSuggestionLabel(suggestion));
    await handleSearch();
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      await handleSearch();
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <TextField
          label={placeholder}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          margin="normal"
          fullWidth
        />
        {suggestions.length > 0 && (
          <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
            <List>
              {suggestions.map((suggestion, index) => (
                <SuggestionListItem key={index} onClick={() => handleSelectSuggestion(suggestion)}>
                  <ListItemText primary={getSuggestionLabel(suggestion)} />
                </SuggestionListItem>
              ))}
            </List>
          </Paper>
        )}
      </Grid>
      <Grid item xs={12} sm={4} display="flex" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={{ height: 'fit-content' }}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
}

export default SearchBar;
