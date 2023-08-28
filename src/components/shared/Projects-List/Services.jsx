import axios from 'axios';
import { useEffect, useState } from 'react';

import BaseUrl from '../../../config';

/**
 * Custom hook for fetching projects data from an API.
 *
 * @param {string} url - The API endpoint URL for fetching projects.
 * @param {number} page - The page number for paginated results.
 * @returns {Object} An object containing the fetched projects data and the count of total projects.
 * @property {Array} projects - The fetched projects data.
 * @property {number} count - The total count of projects.
 */
const useProjects = (url, page) => {
  const [projects, setProjects] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    /**
     * Fetch projects data from the API.
     */
    const fetch = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/${url}/?page=${page}`);
        const data = url === 'projects' ? response.data.results : response.data;
        url === 'projects' ? await setCount(response.data.count) : await setCount(0);
        await setProjects(data);
      } catch (error) {
        return null;
      }
    };
    fetch();
  }, [url, page]);

  return { projects, count };
};

export default useProjects;
