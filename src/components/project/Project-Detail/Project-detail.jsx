import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './single-project.css';
import ConfirmDelete from '../../base/Delete/ConfirmDelete';
import Layout from '../../base/Layout';
import ReviewForm from '../Review/Review-form';

import useProjectData from './Services';

/**
 * A component to display project details and reviews.
 */
const ProjectDetail = () => {
  const token = Cookies.get('access_token');
  const userJSON = Cookies.get('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  const location = useLocation();
  const slug = location.state.slug || location.state;
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const { project, reviews } = useProjectData(slug);

  if (project === null || reviews === null) { return 'Loading...'; }

  /**
   * Check if the user has already reviewed the project.
   *
   * @param {Object} user - The user object.
   * @param {Array} reviews - The array of project reviews.
   * @returns {boolean} True if the user has reviewed the project, false otherwise.
   */
  function userHasReviewed(user, reviews) {
    return reviews.some((review) => review.user.username === user.username);
  }

  const positiveReviews = reviews.filter(review => review.vote === 'Up');
  const ratio = Math.floor(positiveReviews.length / reviews.length * 100);

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
                <div className="ratio ratio-16x9">
                  <iframe
                    src={project.youtube_link}
                    title="featured video"
                    allowFullScreen />
                </div>
                <div />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="be-comment-block">
          <h6 className="comments-title">
            Votes Ratio { isNaN(ratio) ? 0 : ratio }%
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
                    src={ review.user.profile_picture.startsWith('http') ?
                      `${ project.featured_image }` :
                      `http://127.0.0.1:8000/${ review.user.profile_picture }`}
                    alt="avatar.."
                    className="be-ava-comment"
                  />
                </Link>
              </div>
              <div className="be-comment-content">
                <span className="be-comment-name">
                  <Link
                    to={`/profiles/${review.user.profile_slug}`}
                    state={{ slug: review.user.profile_slug }}
                  >
                    { review.user.first_name } { review.user.last_name }
                    { review.vote === 'Up' ? <ThumbUpIcon /> : <ThumbDownIcon /> }
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
          {user ? (
            userHasReviewed(user, reviews) ? (
              <p className="text-info">
          You already reviewed this project.
              </p>
            ) : ( user.username !== project.user.username && ( <ReviewForm slug={project.slug} /> ))
          ) : (
            <Link to='/login'>
              <button className="btn btn-secondary">
        You must login first.
              </button>
            </Link>
          )}
        </div>
      </div>
      { user && user.username === project.user.username && (
        <div className="container">
          <div className="row">
            <div className="col-11 d-flex justify-content-end">
              <button
                className="btn btn-danger"
                onClick={() => setIsConfirmationVisible(true)}
              >
                  Delete
              </button>
              {isConfirmationVisible && (
                <ConfirmDelete slug={slug} token={token} onClose={() => setIsConfirmationVisible(false)} />
              )}
            </div>
            <div className="col-1 d-flex justify-content-end">
              <Link
                to="/edit-project"
                state={{ slug: project.slug }}
              >
                <button className="btn btn-warning">Edit</button>
              </Link>
            </div>
          </div>
        </div>

      )}
    </Layout>
  );
};

export default ProjectDetail;
