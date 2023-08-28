import axios from 'axios';

import BaseUrl from '../../../config';

/**
 * Handles the search functionality by making an API request to search for results.
 *
 * @param {function} setResults - A function to set the search results in the component's state.
 * @param {string} page - The API endpoint or page to search on.
 * @param {string} query - The search query.
 * @returns {Promise<void>} A promise that resolves when the search results are set.
 */
const handleSearch = async (setResults, page, query) => {
  try {
    const response = await axios.get(`${BaseUrl}/${page}?search=${query}`);
    await setResults(response.data.results);
  } catch (error) {
    setResults([]);
  }
};

export default handleSearch;
