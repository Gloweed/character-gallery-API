import axios from 'axios';
import { useCallback } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);

  const fetchData = useCallback(async (url) => {
    setIsFetching(true);
    setIsError(false);

    axios
      .get(url)
      .then(({ data }) => {
        setIsFetching(false);
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((e) => {
        setIsFetching(false);
        setIsError(true);
        console.error(e);
      });
  }, []);

  useEffect(() => {
    fetchData(apiURL);
  }, [apiURL, fetchData]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const status = urlParams.get('status');
    const species = urlParams.get('species');
    const type = urlParams.get('type');
    const gender = urlParams.get('gender');

    let newApiURL = API_URL;
    if (name || status || species || type || gender) {
      newApiURL += '?';
      if (name) newApiURL += `name=${name}&`;
      if (status) newApiURL += `status=${status}&`;
      if (species) newApiURL += `species=${species}&`;
      if (type) newApiURL += `type=${type}&`;
      if (gender) newApiURL += `gender=${gender}&`;
    }

    setApiURL(newApiURL);
  }, []);

  const filtersValues = useMemo(() => {
    return {
      statuses: ['Alive', 'Dead', 'Unknown'],
      species: [
        'Human',
        'Alien',
        'Robot',
        'Humanoid',
        'Mythological Creature',
        'Animal',
        'Poopybutthole',
        'Cronenberg',
        'Disease',
        'Unknown'
      ],
      genders: ['Female', 'Male', 'Genderless', 'Unknown']
    };
  }, []);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      fetchData,
      isFetching,
      isError,
      info,
      filtersValues
    }),
    [
      activePage,
      apiURL,
      characters,
      isFetching,
      isError,
      info,
      fetchData,
      filtersValues
    ]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
