import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../config';
import { Link } from 'react-router-dom';
import { GitHub, YouTube, LinkedIn } from '@mui/icons-material';
import Layout from '../base/Layout';
import Cards from './loader/Cards';
import Hero from '../base/Hero';
import './profiles.css';

const Profiles = () => {

  const [ profiles, setProfiles ] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect( () => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/profiles/`);
        await setProfiles(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return <Layout> <Cards /> </Layout>;
  }

  return (
    <Layout>
      <Hero />
      <section className="main-content">
        <div className="container">
          <h1 className="text-center">
          Our <b>Developers</b>
          </h1>
          <p className="text-center text-muted">
          Explore the Brilliant Minds Behind the Magic – Get to Know Our Developers Who Bring Ideas to Life.
          </p>
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
                    state={{ profile: profile }}
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
      </section>
    </Layout>
  );
};

export default Profiles;
