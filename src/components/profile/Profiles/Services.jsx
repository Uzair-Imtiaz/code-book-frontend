import axios from 'axios';
import { useEffect, useState } from 'react';

import BaseUrl from '../../../config';

/**
 * Custom hook to fetch profiles from the server.
 * @param {number} page - The page number of profiles to fetch.
 * @returns {{ profiles: Array<Object> | null, count: number }} An object containing the fetched profiles and total count.
 */
const useProfiles = (page) => {
  const [profiles, setProfiles] = useState(null);
  const [ count, setCount ] = useState(0);
  
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/profiles/?page=${page}`);
        await setProfiles(response.data.results);
        await setCount(response.data.count);
      } catch (error) {
        return null;
      }
    };
    fetch();
  }, [page]);
  return { profiles, count };
};

/**
 * Handles searching for profiles based on a query.
 * @param {function} setResults - A state setter function to update search results.
 * @param {number} page - The page number for paginated search results.
 * @param {string} query - The search query.
 * @returns {Promise<void>} A promise that resolves with the search results.
 */
export const handleSearch = async (setResults, page, query) => {
  try {
    const response = await axios.get(`${BaseUrl}/page?keyword=${query}`);
    await setResults(response.data.results);
  } catch (error) {
    return [];
  }
};

export default useProfiles;
