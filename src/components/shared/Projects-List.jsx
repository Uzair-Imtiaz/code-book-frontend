import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BaseUrl from '../../config';
import Cards from '../project/Loader/Cards';
const ProjectsList = ({ url }) => {
  const [ projects, setProjects ] = useState(null);
  const [ loading, setLoading ] =useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/${url}`);
        const data = url === 'projects' ? response.data.results : response.data;
        await setProjects(data);
        setLoading(false);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);


  if (loading) {
    return <Cards />;
  }

  return (
    <section className="main-content">
      <div className="container">
        <div className="row">
          { projects.map(project => (
            <div
              className="col-xs-12 col-sm-12 col-md-4 col-lg-4"
              key={ project.id }
            >
              <Link
                to={`/projects/${project.slug}`}
                state={{
                  project: project,
                  reviews: project.review,
                }}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <div className="card shadow mt-3">
                  <img
                    src={ project.featured_image.startsWith('http') ?
                      `${ project.featured_image }` :
                      `http://127.0.0.1:8000/${ project.featured_image }`}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h2 className="card-title">{ project.title }</h2>
                    <Link
                      to={'/profiles/'}
                      style={{ textDecoration: 'none', color: 'cornflowerblue', fontStyle: 'italic' }}>
                      <h6 className="text-muted font-italic">By { project.user.first_name } { project.user.last_name }</h6>
                    </Link>
                  </div>
                  <div className="card_skills row mx-2 mb-3">
                    { project.skills.map(tag => (
                      <div
                        className="col-3 mb-2"
                        key={ tag.name }>
                        <span className="badge custom-badge">{ tag.name }</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsList;
