import { Pagination } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Cards from '../../project/Loader/Cards';
import '../../project/Projects/projects.css';

import useProjects from './Services';

/**
 * Displays a list of projects with pagination.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.url - The API endpoint URL for fetching projects.
 * @param {Array} props.results - An array of project results when a search query is provided.
 * @param {string} props.query - The search query for filtering projects.
 * @returns {JSX.Element} The JSX element representing the project list.
 */
const ProjectsList = ({ url, results, query }) => {
  const [page, setPage] = useState(1);

  // Fetch projects data using the custom hook
  let { projects, count } = useProjects(url, page);

  // Display loading cards while fetching data
  if (projects === null) {
    return <Cards />;
  }

  // Use search results if a query is provided
  if (query && query !== '') {
    projects = results;
  }

  return (
    <section className="main-content">
      <div className="container">
        <div className="row">
          {projects && projects.map((project) => (
            <div
              className="col-xs-12 col-sm-12 col-md-4 col-lg-4"
              key={project.id}
            >
              <Link
                to={`/projects/${project.slug}`}
                state={{
                  slug: project.slug,
                }}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <div className="card shadow mt-3">
                  <div className="img-container">
                    <img
                      src={
                        project.featured_image.startsWith('http')
                          ? `${project.featured_image}`
                          : `http://127.0.0.1:8000/${project.featured_image}`
                      }
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                  <div className="card-body">
                    <h2 className="card-title">{project.title}</h2>
                    <Link
                      to={`/profiles/${project.user.profile_slug}`}
                      style={{
                        textDecoration: 'none',
                        color: 'cornflowerblue',
                        fontStyle: 'italic',
                      }}
                    >
                      <h6 className="text-muted font-italic">
                        By {project.user.first_name} {project.user.last_name}
                      </h6>
                    </Link>
                  </div>
                  <div className="card_skills row mx-2 mb-3">
                    {project.skills.map((tag) => (
                      <div className="col-3 mb-2" key={tag}>
                        <span className="badge custom-badge">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Pagination
        count={Math.ceil(count / 6)}
        color="warning"
        className="d-flex justify-content-center mt-3"
        defaultPage={page}
        onChange={(event, value) => setPage(value)}
      />
    </section>
  );
};

export default ProjectsList;
