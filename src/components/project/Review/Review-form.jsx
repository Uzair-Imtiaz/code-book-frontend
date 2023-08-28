import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import React from 'react';
import * as Yup from 'yup';

import { useMessage } from '../../context/MessageContext';

import handleReviewSubmit from './Services';

/**
 * Component for submitting reviews.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.slug - The slug of the project for which the review is being submitted.
 * @returns {JSX.Element} The JSX element representing the review form.
 */
const ReviewForm = ({ slug }) => {
  const token = Cookies.get('access_token');
  const userJSON = Cookies.get('user');
  const user = JSON.stringify(userJSON);
  const { setMessage } = useMessage();
  const formik = useFormik({
    initialValues: {
      vote: '',
      body: '',
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('vote', values.vote);
      formData.append('body', values.body);
      formData.append('user', user);
      const { success, message } = await handleReviewSubmit(user, formData, slug, token);
      formik.resetForm();
      setMessage({ ...message });
    },
    validationSchema: Yup.object().shape({
      vote: Yup.string().required('Required'),
      body: Yup.string().required('Required'),
    }),
    validateOnBlur: true,
    validateOnChange: true,
  });

  return (
    <>
      <h2 className="my-3">Leave a Review</h2>
      <form
        className="form-block"
        onSubmit={formik.handleSubmit}
        method="post"
      >
        <div className="row">
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="vote">
                Vote
              </label>
              <select
                id="vote"
                name="vote"
                onChange={formik.handleChange}
                value={formik.values.vote}
                className={`form-control ${formik.touched.vote && formik.errors.vote ? 'is-invalid' : ''}`}
              >
                <option value="" />
                <option value="Up">Up</option>
                <option value="Down">Down</option>
              </select>
              {formik.touched.vote && formik.errors.vote && (
                <div className="invalid-feedback">{formik.errors.vote}</div>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <div className="form-group">
              <label htmlFor="body">
                Review
              </label>
              <textarea
                id="body"
                name="body"
                rows={3}
                onChange={formik.handleChange}
                value={formik.values.body}
                className={`form-control ${formik.touched.body && formik.errors.body ? 'is-invalid' : ''}`}
              />
              {formik.touched.body && formik.errors.body && (
                <div className="invalid-feedback">{formik.errors.body}</div>
              )}
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-xs-12 d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary">
              Add review
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ReviewForm;
