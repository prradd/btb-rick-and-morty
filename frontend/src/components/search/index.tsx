'use client';

import { useState } from 'react';
import { Container, CircularProgress } from '@mui/material';
import SearchBar from '@/components/search/SearchBar';
import DataList from '@/components/DataList';

interface SearchComponentProps<T> {
  fetchData: (query: string) => Promise<T[]>;
  getSuggestionLabel: (item: T) => string;
  placeholder: string;
  columns: { key: keyof T; label: string }[];
}

function SearchComponent<T extends unknown>({
  fetchData, getSuggestionLabel, placeholder, columns,
}: SearchComponentProps<T>) {
  const [results, setResults] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSearch = async (data: T[]) => {
    setIsLoading(true);
    try {
      setResults(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <SearchBar<T>
        fetchData={fetchData}
        onSearch={handleSearch}
        getSuggestionLabel={getSuggestionLabel}
        placeholder={placeholder}
      />
      {isLoading && <CircularProgress />}
      {error && (
        <p>
        Error:
          {error.message}
        </p>
      )}
      {!isLoading && results.length > 0 && (
        <DataList<T>
          data={results}
          columns={columns}
        />
      )}
    </Container>
  );
}

export default SearchComponent;
