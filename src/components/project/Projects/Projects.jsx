import React, { useState } from 'react';

import Hero from '../../base/Hero/Hero';
import Layout from '../../base/Layout';
import ProjectsList from '../../shared/Projects-List/Projects-List';

/**
 * Component for displaying a list of projects.
 *
 * @returns {JSX.Element} The JSX element representing the projects page.
 */
const Projects = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  return (
    <Layout>
      <Hero page={'projects'} query={query} setQuery={setQuery} setResults={setResults} />
      {query === '' ? (
        <>
          <h1 className="text-center">
            <b>Projects</b>
          </h1>
          <p className="text-center text-muted mb-3">
            Exploring Excellence: Delve into Our Array of Projects, Each a Testament to Creativity and Craftsmanship.
          </p>
        </>
      ) : (
        <h3 className="text-center">
          <b>Showing results for: </b>{query}
        </h3>
      )}
      <ProjectsList url={'projects'} results={results} query={query} />
    </Layout>
  );
};

export default Projects;
