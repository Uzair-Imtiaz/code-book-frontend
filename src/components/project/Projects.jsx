import React from 'react';
import Layout from '../base/Layout';
import Hero from '../base/Hero';
import ProjectsList from '../shared/Projects-List';

const Projects = () => {
  return (
    <Layout>
      <Hero />
      <h1 className="text-center">
        <b>Projects</b>
      </h1>
      <p className="text-center text-muted mb-3">
        Exploring Excellence: Delve into Our Array of Projects, Each a Testament to Creativity and Craftsmanship.
      </p>
      <ProjectsList url={'projects'} />
    </Layout>
  );
};

export default Projects;
