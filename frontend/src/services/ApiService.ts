export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
}

export interface CharactersResponse {
  results: Character[];
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

export interface EpisodesResponse {
  results: Episode[];
}

export const fetchCharacters = async (query: string): Promise<Character[]> => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${query}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: CharactersResponse = await response.json();
  return data.results;
};

export const fetchEpisodes = async (query: string): Promise<Episode[]> => {
  const response = await fetch(`https://rickandmortyapi.com/api/episode/?name=${query}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: EpisodesResponse = await response.json();
  return data.results;
};

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
}

export interface LocationsResponse {
  results: Location[];
}
export const fetchLocations = async (query: string): Promise<Location[]> => {
  const response = await fetch(`https://rickandmortyapi.com/api/location/?name=${query}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: LocationsResponse = await response.json();
  return data.results;
};
