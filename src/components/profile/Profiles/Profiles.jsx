import { GitHub, YouTube, LinkedIn } from '@mui/icons-material';
import { Pagination } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Hero from '../../base/Hero/Hero';
import Layout from '../../base/Layout';
import Cards from '../loader/Cards';

import './profiles.css';
import useProfiles from './Services';

/**
 * React component representing the Profiles page.
 * @returns {JSX.Element} The rendered component.
 */
const Profiles = () => {
  const [ page, setPage ] = useState(1);
  let { profiles, count } = useProfiles(page);
  const [results, setResults] = useState([]);
  const [ query, setQuery ] = useState('');
  if (profiles === null) {
    return <Layout> <Cards /> </Layout>;
  }

  if (query !== '') {
    profiles = results;
  }

  return (
    <Layout>
      <Hero page={'profiles'} setResults={setResults} query={ query} setQuery={setQuery}/>
      <section className="main-content">
        <div className="container">
          { query === '' ? (
            <>
              <h1 className="text-center">
          Our <b>Developers</b>
              </h1>
              <p className="text-center text-muted">
          Explore the Brilliant Minds Behind the Magic – Get to Know Our Developers Who Bring Ideas to Life.
              </p>
            </>) : (
            <h3 className="text-center">
              <b>Showing search results for: </b> {query}
            </h3>
          )}
          <br />
          <br />
          <div className="row">
            { profiles.map(profile => (
              <div
                className="col-lg-4 col-md-6 col-sm-12 mb-4"
                key={profile.id}
              >
                <div className="profile-card bg-white shadow mb-4 text-center rounded-lg p-4 position-relative h-100">
                  <Link
                    to={`profiles/${profile.slug}`}
                    state={{ slug: profile.slug }}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <div className="profile-card_image">
                      <img
                        src={ profile.profile_picture }
                        alt="User"
                        className="mb-4 shadow"
                      />
                    </div>
                    <div className="profile-card_details">
                      <h3 className="mb-0">
                        { profile.user.first_name } { profile.user.last_name }
                      </h3>
                      <p className="text-muted">
                        { profile.short_intro }
                      </p>
                      { profile.bio && (
                        <p className="text-muted">
                          { profile.bio.length > 160 ? `${profile.bio.slice(0, 160)}...` : profile.bio }
                        </p>
                      )}
                    </div>
                    <div className="profile-card_skills row mx-3">
                      { profile.skills.map(skill => (
                        <div key={skill.id} className="col-3 mb-2">
                          <span className="badge custom-badge">{ skill }</span>
                        </div>
                      ))}
                    </div>
                  </Link>
                  <div className="profile-card_social text-center p-4">
                    { profile.github && (
                      <a
                        href={`https://github.com/${profile.github}`}
                        className="d-inline-block"
                      >
                        <GitHub />
                      </a>
                    )}
                    { profile.linkedin && (
                      <a
                        href={`https://www.linkedin.com/in/${profile.linkedin}`}
                        className="d-inline-block"
                      >
                        <LinkedIn />
                      </a>
                    )}
                    { profile.youtube && (
                      <a
                        href={`https://www.youtube.com/${profile.youtube}`}
                        className="d-inline-block"
                      >
                        <YouTube />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Pagination
          count={Math.ceil(count / 6)}
          color="warning"
          className="d-flex justify-content-center"
          defaultPage={page}
          onChange={(event, value) => setPage(value)}
        />
      </section>
    </Layout>
  );
};

export default Profiles;
