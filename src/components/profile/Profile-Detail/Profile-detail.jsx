import { GitHub, YouTube, LinkedIn } from '@mui/icons-material';
import Cookies from 'js-cookie';
import React from 'react';
import './single-profile.css';
import { Link, useLocation } from 'react-router-dom';

import Layout from '../../base/Layout';
import ProjectsList from '../../shared/Projects-List/Projects-List';

import useProfileData, { calculateAge } from './Services';

/**
 * ProfileDetail component displays the detailed information about a user's profile.
 */
const ProfileDetail = () => {
  const userJSON = Cookies.get('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  const location = useLocation();
  const slug = location.state.slug || location.state;

  const { profile, isLoading } = useProfileData(slug);

  if (isLoading) { return 'Loading...'; }

  return (
    <Layout>
      <section className="bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-4 mb-sm-5">
              <div className="card card-style1 border-0">
                <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                  <div className="row align-items-center">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                      <img
                        src={ profile.profile_picture }
                        width={500}
                        alt="..."
                      />
                    </div>
                    <div className="col-lg-6 px-xl-10">
                      <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                        <h3 className="h2 text-white mb-0">
                          { profile.user.first_name } { profile.user.last_name }
                        </h3>
                        <span className="text-primary">
                          { profile.short_intro }
                        </span>
                      </div>
                      <ul className="list-unstyled mb-1-9">
                        <li className="mb-2 mb-xl-3 display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            Gender:
                          </span>
                          { profile.gender }
                        </li>
                        <li className="mb-2 mb-xl-3 display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            Age:
                          </span>
                          { calculateAge(profile.date_of_birth) }
                        </li>
                        <li className="mb-2 mb-xl-3 display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            Email:
                          </span>{' '}
                          { profile.user.email }
                        </li>
                        { profile.linkedin && (
                          <a
                            href={`https://www.linkedin.com/in/${profile.linkedin}`}
                            style={{ textDecoration: 'none', color: 'black' }}
                          >
                            <li className="mb-2 mb-xl-3 display-28">
                              <span className="display-26 text-secondary me-2 font-weight-600">
                                LinkedIn:
                              </span>
                              https://www.linkedin.com/in/{ profile.linkedin }
                              <LinkedIn />
                            </li>
                          </a>
                        )}
                        { profile.github && (
                          <a
                            href={`https://github.com/${ profile.github }`}
                            style={{ textDecoration: 'none', color: 'black' }}
                          >
                            <li className="mb-2 mb-xl-3 display-28">
                              <span className="display-26 text-secondary me-2 font-weight-600">
                                Github:
                              </span>
                              https://github.com/{ profile.github }
                              <GitHub />
                            </li>
                          </a>
                        )}
                        { profile.youtube && (
                          <a
                            href={`https://www.youtube.com/${ profile.youtube }`}
                            style={{ textDecoration: 'none', color: 'black' }}
                          >
                            <li className="display-28">
                              <span className="display-26 text-secondary me-2 font-weight-600">
                                Youtube:
                              </span>
                              https://www.youtube.com/{ profile.youtube }
                              <YouTube />
                            </li>
                          </a>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 mb-4 mb-sm-5">
              <div>
                <span className="section-title text-primary mb-3 mb-sm-4">
                  About Me
                </span>
                <p>
                  { profile.bio }
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-12 mb-4 mb-sm-5">
                  <div className="mb-4 mb-sm-5">
                    <span className="section-title text-primary mb-3 mb-sm-4">
                      Skills
                    </span>
                    <div className="progress-text">
                      { profile.skills.map(skill => (
                        <div
                          className="row"
                          key={skill.name}>
                          <div className="col-6">
                            { skill }
                          </div>
                        </div>
                      ))}
                      <div>
                        <hr />
                        <span className="section-title text-primary mb-3 mb-sm-4">
                          Projects
                        </span>
                        { profile.project.length !== 0 && (
                          <ProjectsList url={`profiles/${profile.slug}/projects`}/>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            { user && user.username === profile.user.username && (
              <div className="container">
                <div className="row justify-content-end">
                  <div className="col-auto">
                    <Link
                      to="/edit-profile"
                      state={{ slug: slug }}
                    >
                      <button className="btn btn-primary">Edit Profile</button>
                    </Link>
                  </div>
                  <div className="col-auto">
                    <Link to="/add-project">
                      <button className="btn btn-warning">Add Project</button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProfileDetail;
