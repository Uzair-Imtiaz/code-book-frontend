import React from 'react';

import handleSearch from './Services';

/**
 * The Hero component displays a search form.
 *
 * @param {string} page - The API endpoint or page to search on.
 * @param {function} setResults - A function to set the search results in the component's state.
 * @param {string} query - The search query.
 * @param {function} setQuery - A function to set the search query in the component's state.
 * @returns {JSX.Element} The JSX representation of the Hero component.
 */
const Hero = ({ page, setResults, query, setQuery }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSearch(setResults, page, query);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
    handleSearch(setResults, page, query);
  };
  return (
    <form
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="px-4 py-5 mt-5 text-center">
        <h1 className="display-5 fw-bold">Unlock Boundless Creativity</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
          In the realm of boundless creativity, there are no limits, only opportunities waiting to
          be explored and expressed.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={query}
                onChange={handleChange}
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="basic-addon2" />
              <button type="submit" className="btn btn-warning btn-lg px-4 gap-3">
              Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Hero;
