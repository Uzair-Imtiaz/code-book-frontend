import { GitHub, YouTube, LinkedIn } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import React from 'react';

/**
 * `Cards` component displays a list of profile cards with skeleton loading placeholders.
 * It's used to provide a loading UI while fetching actual profile data.
 */
const Cards = () => {
  return (

    <section className="main-content">
      <div className="container">
        <h1 className="text-center">
        Our <b>Developers</b>
        </h1>
        <br />
        <br />
        <div className="row">
          { [1, 2, 3].map(index => (
            <div
              className="col-lg-4 col-md-6 col-sm-12 mb-4"
              key={index}
            >
              <div className="profile-card bg-white shadow mb-4 text-center rounded-lg p-4 position-relative h-100">
                <div className="profile-card_image">
                  <Skeleton variant="circular" height={100} width={100} />
                </div>
                <div className="profile-card_details" >
                  <Skeleton height={20} width={120} style={{ marginTop: 20, marginBottom: 8 }} />
                  <Skeleton height={10} width={80} style={{ marginBottom: 18 }} />
                  <Skeleton height={8} width={140} style={{ marginBottom: 6 }} />
                  <Skeleton height={8} width={140} style={{ marginBottom: 6 }} />
                  <Skeleton height={8} width={140} style={{ marginBottom: 15 }} />
                </div>
                <div className="profile-card_skills row mx-3">
                  <Skeleton height={16} width={30} style={{ marginTop: 4, marginRight: 4 }} />
                  <Skeleton height={16} width={30} style={{ marginTop: 4, marginRight: 4 }} />
                  <Skeleton height={16} width={30} style={{ marginTop: 4, marginRight: 4 }} />
                </div>
                <div className="profile-card_social text-center p-4">
                  <GitHub />
                  <LinkedIn />
                  <YouTube />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;
