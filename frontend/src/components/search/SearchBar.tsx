'use client';

import React, { useState, useEffect } from 'react';
import {
  TextField, List, ListItem, ListItemText, Paper, Grid, Button, ClickAwayListener,
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

const SuggestionsContainer = styled(Paper)({
  position: 'absolute',
  width: '100%',
  maxHeight: 260,
  overflow: 'auto',
  zIndex: 1,
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

  const handleSearch = async (value: string) => {
    try {
      const results = await fetchData(value);
      onSearch(results);
    } catch {
      onSearch([]);
    }
    setSuggestions([]);
  };

  const handleSelectSuggestion = async (suggestion: T) => {
    const suggestionLabel = getSuggestionLabel(suggestion);
    setInputValue(suggestionLabel);
    await handleSearch(suggestionLabel);
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      await handleSearch(inputValue);
    }
  };

  const handleClickAway = () => {
    setSuggestions([]);
  };

  useEffect(() => {
    if (suggestions.some(suggestion => getSuggestionLabel(suggestion) === inputValue)) {
      setSuggestions([]);
    }
  }, [inputValue, suggestions, getSuggestionLabel]);

  return (
    <Grid container spacing={2} position="relative" mb={2}>
      <Grid item xs={12} sm={8}>
        <Grid container spacing={2}>
          <Grid item xs={8} position="relative">
            <ClickAwayListener onClickAway={handleClickAway}>
              <div>
                <TextField
                  label="Search"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  fullWidth
                />
                {suggestions.length > 0 && (
                  <SuggestionsContainer>
                    <List>
                      {suggestions.map((suggestion, index) => (
                        <SuggestionListItem key={index} onClick={() => handleSelectSuggestion(suggestion)}>
                          <ListItemText primary={getSuggestionLabel(suggestion)} />
                        </SuggestionListItem>
                      ))}
                    </List>
                  </SuggestionsContainer>
                )}
              </div>
            </ClickAwayListener>
          </Grid>
          <Grid item xs={4} sm={4} display="flex" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSearch(inputValue)}
              style={{ height: '60px' }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SearchBar;
