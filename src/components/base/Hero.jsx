import React from 'react';

const Hero = () => {
  return (
    <div className="px-4 py-5 mt-5 text-center">
      <h1 className="display-5 fw-bold">Unlock Boundless Creativity</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          In the realm of boundless creativity, there are no limits, only opportunities waiting to
          be explored and expressed.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search..." aria-label="Search"
              aria-describedby="basic-addon2" />
            <button type="button" className="btn btn-warning btn-lg px-4 gap-3">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Hero;
