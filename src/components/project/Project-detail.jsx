import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './single-project.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Layout from '../base/Layout';

const ProjectDetail = () => {
  const location = useLocation();
  const project = location.state.project;
  const reviews = location.state.reviews;
  const positiveReviews = reviews.filter(review => review.vote === 'Up');

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="m-auto d-flex justify-content-center">
              <h1 className="project-title mt-4 mb-3">
                { project.title }
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="project-info-box mt-0">
              <h5>PROJECT DETAILS</h5>
              <p className="mb-0 text-muted">
                { project.description }
              </p>
            </div>
            <div className="project-info-box">
              <dl className="row">
                <dt className="col-sm-3">Author</dt>
                <dd className="col-sm-9 text-muted">
                  <Link
                    to={`/profiles/${project.user.profile_slug}`}
                  >
                    { project.user.first_name } { project.user.last_name }
                  </Link>
                </dd>
                { project.source_code_link && (
                  <>
                    <dt className="col-sm-3">Source</dt>
                    <dd className="col-sm-9">
                      <a className="text-muted" href={project.source_code_link}>
                        { project.source_code_link }
                      </a>
                    </dd>
                  </>
                )}
                { project.demo_link && (
                  <>
                    <dt className="col-sm-3">Demo</dt>
                    <dd className="col-sm-9">
                      <a className="text-muted" href={project.demo_link}>
                        { project.demo_link }
                      </a>
                    </dd>
                  </>
                )}
              </dl>
            </div>
          </div>
          <div className="col-md-7">
            <img
              src={ project.featured_image.startsWith('http') ?
                `${ project.featured_image }` :
                `http://127.0.0.1:8000/${ project.featured_image }`}
              alt="featured.."
              className="rounded"
              width={700}
            />
            <div className="project-info-box">
              <div className="col-12 mb-2 inline">
                { project.skills.map(tag => (
                  <span
                    className="badge custom-badge"
                    key={tag.name}
                  >
                    { tag }
                  </span>
                ))}
              </div>
            </div>
            { project.youtube_link && (
              <div className="project-info-box mt-0 mb-0 d-flex justify-content-center">
                <div>
                  <i className="fab fa-youtube" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="be-comment-block">
          <h6 className="comments-title">
            Votes Ratio { positiveReviews.length / reviews.length * 100 }%
          </h6>
          <h1 className="comments-title">
            Review{reviews.length !== 1 ? 's' : ''} ({reviews.length})
          </h1>
          { reviews.map(review => (
            <div
              className="be-comment"
              key={review.id}
            >
              <div className="be-img-comment">
                <Link
                  to={`/profiles/${review.user.profile_slug}`}>
                  <img
                    src={review.user.profile_picture}
                    alt="avatar.."
                    className="be-ava-comment"
                  />
                </Link>
              </div>
              <div className="be-comment-content">
                <span className="be-comment-name">
                  <Link
                    to={`/profiles/${review.user.profile_slug}`}>
                    { review.user.first_name } { review.user.last_name }
                    { review.vote === 'Up' ?
                      <ThumbUpIcon /> :
                      <ThumbDownIcon />
                    }
                  </Link>
                </span>
                <span className="be-comment-time">
                  <AccessTimeFilledIcon />
                  { review.created }
                </span>
                <p className="be-comment-text">
                  { review.body }
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
