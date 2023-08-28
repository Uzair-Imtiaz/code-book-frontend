import { Skeleton } from '@mui/material';
import React from 'react';

/**
 * A component that renders a list of skeleton cards for loading content.
 * @returns {JSX.Element} The rendered component.
 */
const Cards = () => {
  return (
    <div className="container">
      <div className="row">
        { [1, 2, 3, 4, 5, 6].map(index => (
          <div
            className="col-xs-12 col-sm-12 col-md-4 col-lg-4"
            key={ index }
          >
            <div className="card shadow mt-3 mb-3" >
              <Skeleton variant="rectangular" height={277} style={{ marginBottom: 15 }}/>
              <div className="card-body">
                <h2 className="card-title">
                  <Skeleton height={25} width={130} style={{ marginBottom: 13 }}/>
                </h2>
                <h6>
                  <Skeleton height={12} width={200} style={{ marginBottom: 15 }} />
                </h6>
              </div>
              <div className="card_skills row mx-2 mb-3">
                <Skeleton height={16} width={30} style={{ marginBottom: 8, marginRight: 4, marginLeft: 8 }} />
                <Skeleton height={16} width={30} style={{ marginBottom: 8, marginRight: 4 }} />
                <Skeleton height={16} width={30} style={{ marginBottom: 8, marginRight: 4 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
