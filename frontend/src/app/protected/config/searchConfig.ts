import {
  Character, Episode, fetchCharacters, fetchEpisodes, fetchLocations, Location,
} from '@/services/ApiService';

interface SearchOption<T> {
  label: string;
  fetchData: (query: string) => Promise<T[]>;
  getSuggestionLabel: (item: T) => string;
  placeholder: string;
  columns: { key: keyof T; label: string }[];
  adminOnly?: boolean;
}

const searchOptions: { [key: string]: SearchOption<any> } = {
  characters: {
    label: 'Characters',
    fetchData: fetchCharacters,
    getSuggestionLabel: (item: Character) => item.name,
    placeholder: 'Search Characters',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'status', label: 'Status' },
      { key: 'species', label: 'Species' },
    ],
  },
  locations: {
    label: 'Locations',
    fetchData: fetchLocations,
    getSuggestionLabel: (item: Location) => item.name,
    placeholder: 'Search Locations',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'type', label: 'Type' },
      { key: 'dimension', label: 'Dimension' },
    ],
    adminOnly: true,
  },
  episodes: {
    label: 'Episodes',
    fetchData: fetchEpisodes,
    getSuggestionLabel: (item: Episode) => item.name,
    placeholder: 'Search Episodes',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'episode', label: 'Episode' },
      { key: 'air_date', label: 'Air Date' },
    ],
  },
};

export default searchOptions;
