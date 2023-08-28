import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import Layout from '../../base/Layout';
import { useMessage } from '../../context/MessageContext';
import useProfileData from '../Profile-Detail/Services';
import SkillForm from '../Skill/Skill-form';

import handleProfileSubmit from './Services';

/**
 * Renders the profile form for creating or editing a user's profile.
 */
function ProfileForm() {
  const [ isSkillFormVisible, setIsSkillFormVisible ] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  const { setMessage } = useMessage();
  const token = Cookies.get('access_token');
  const userJSON = Cookies.get('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  const isEditForm = user ? !!user.profile_slug : false;

  /* eslint-disable camelcase */
  const validationSchema = Yup.object().shape({
    short_intro: Yup.string().required('Required'),
    bio: Yup.string().required('Required'),
    github: Yup.string().test('no-https', 'Provide the username only', function (value) {
      return !value || (!value.includes('https') && !value.includes('https://github.com/'));
    }),
    linkedin: Yup.string().test('no-https', 'Provide the username only', function (value) {
      return !value || (!value.includes('https') && !value.includes('https://linkedin.com/'));
    }),
    youtube: Yup.string().test('no-https', 'Provide the username only', function (value) {
      return !value || (!value.includes('https') && !value.includes('https://youtube.com/'));
    }),
    gender: Yup.string().required('Required'),
    date_of_birth: Yup.date().required('Required'),
  });

  const { profile, isLoading_ } = useProfileData(user ? user.profile_slug : null);

  useEffect(() => {
    if (!token) {
      setMessage({
        type: 'error',
        body: 'Log in first',
      });
      navigate('/login');
    }
    else if (!isLoading_) {
      setProfileData(profile);
      setIsLoading(false);
    }
  }, [isLoading_, profile]);

  if (!token) {
    return null;
  }

  if (isEditForm && !profileData) {
    return <p>...</p>;
  }

  const initialValues = {
    short_intro: profileData ? profileData.short_intro : '',
    bio: profileData ? profileData.bio : '',
    skills: profileData ? profileData.skills : '',
    image: profileData ? profileData.image : '',
    github: profileData ? profileData.github : '',
    linkedin: profileData ? profileData.linkedin : '',
    youtube: profileData ? profileData.youtube : '',
    gender: profileData ? profileData.gender : '',
    date_of_birth: profileData ? profileData.date_of_birth : '',
  };
  /* eslint-enable camelcase */

  const handleSubmit = async (values) => {
    const { slug, success, message } = await handleProfileSubmit(values, token, isEditForm, user.profile_slug);
    setMessage({ ...message });
    if (success) {
      if (!isEditForm) {
        /* eslint-disable camelcase */
        user.profile_slug = slug;
        user.profile_picture = values.image;
        /* eslint-enable camelcase */
        Cookies.set('user', JSON.stringify(user), { path: '/', expires: 1, secure: true });
      }
      navigate(`/profiles/${slug}`, { state: slug });
    }
  };

  if (isLoading) {
    return <h3>Loading..</h3>;
  }

  return (
    <Layout>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card my-3">
              <div className="card-header d-flex align-items-center">
                <button
                  style={{ border: 'none', background: 'none' }}
                  onClick={() => navigate(-1)}>
                  <ArrowBackIosIcon />
                </button>
                <h3 className="d-flex mt-1 flex-grow-1">Edit Profile</h3>
              </div>
              <div className="card-body">
                <Formik
                  initialValues={initialValues}
                  enableReinitialize={true}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  {({ values, errors, touched, setFieldValue }) => (
                    <Form encType="multipart/form-data">
                      <div className="mb-3">
                        <label htmlFor="intro" className="form-label">
                          <h4>Short Intro</h4>
                        </label>
                        <Field
                          type="text"
                          id="intro"
                          name="short_intro"
                          className={`form-control ${
                            errors.short_intro && touched.short_intro
                              ? 'is-invalid'
                              : ''
                          }`}
                        />
                        <ErrorMessage name="short_intro" component="div" className="invalid-feedback" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="bio" className="form-label">
                          <h4>Bio</h4>
                        </label>
                        <Field
                          as="textarea"
                          id="bio"
                          name="bio"
                          rows="7"
                          className={`form-control ${
                            errors.bio && touched.bio
                              ? 'is-invalid'
                              : ''
                          }`}
                        />
                        <ErrorMessage name="bio" component="div" className="invalid-feedback" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="skills" className="form-label upload-label">
                          <h4>Skills</h4>
                        </label>
                        <div className="position-relative">
                          <Button
                            className="position-absolute top-0 end-0 mt-2 ms-2"
                            variant="warning"
                            size="lg"
                            onClick={() => setIsSkillFormVisible(true)}
                          >
                            <AddIcon />
                          </Button>
                        </div>
                        {isSkillFormVisible && (
                          <SkillForm onClose={() => setIsSkillFormVisible(false)} />
                        )}
                        <Field
                          as="textarea"
                          className="form-control"
                          id="skills"
                          name="skills"
                          value={Array.isArray(values.skills) ? values.skills.join(' ') : values.skills}
                          rows="2"
                          placeholder="Enter skills separated by space"
                        />
                        <ErrorMessage name="skills" component="div"
                          className="invalid-feedback"/>
                        {Array.isArray(values.skills) ? (
                          <>
                            {values.skills.map((skill, index) => (
                              <div key={index} className="tag">
                                {skill}
                                <button
                                  className="tag-close"
                                  onClick={() => {
                                    const updatedSkills = [...values.skills];
                                    updatedSkills.splice(index, 1);
                                    setFieldValue('skills', updatedSkills.join(' '));
                                  }}
                                >
                                  <CloseIcon />
                                </button>
                              </div>
                            ))}
                          </>
                        ) : (
                          values.skills && values.skills.split(' ').length > 0 && (
                            <div className="tags-container my-2">
                              {values.skills.split(' ').map((skill, index) => (
                                <div key={index} className="tag">
                                  {skill}
                                  {values.skills && (
                                    <button
                                      className="tag-close"
                                      onClick={() => {
                                        const updatedSkills = values.skills.split(' ').map(t => t.trim());
                                        updatedSkills.splice(index, 1);
                                        setFieldValue('skills', updatedSkills.join(' '));
                                      }}
                                    >
                                      <CloseIcon />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          )) }
                      </div>
                      <div className="mb-3">
                        <label htmlFor="profile-picture" className="form-label">
                          <h4>Profile Picture</h4>
                        </label>
                        <input
                          type="file"
                          id="profile-picture"
                          name="profile_picture"
                          accept="image/*"
                          onChange={(event) => {
                            setFieldValue('image', event.target.files[0]);
                          }}
                          className={`form-control ${
                            errors.image && touched.image
                              ? 'is-invalid'
                              : ''
                          }`}
                        />
                        <ErrorMessage name="image" component="div" className="invalid-feedback" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="github" className="form-label">
                          <h4>Github Username</h4>
                        </label>
                        <Field
                          type="text"
                          id="github"
                          name="github"
                          className={`form-control ${
                            errors.github && touched.github
                              ? 'is-invalid'
                              : ''
                          }`}
                        />
                        <ErrorMessage name="github" component="div" className="invalid-feedback" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="linkedin" className="form-label">
                          <h4>LinkedIn Username</h4>
                        </label>
                        <Field
                          type="text"
                          id="linkedin"
                          name="linkedin"
                          className={`form-control ${
                            errors.linkedin && touched.linkedin
                              ? 'is-invalid'
                              : ''
                          }`}
                        />
                        <ErrorMessage name="linkedin" component="div" className="invalid-feedback" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="youtube" className="form-label">
                          <h4>YouTube Username</h4>
                        </label>
                        <Field
                          type="text"
                          id="youtube"
                          name="youtube"
                          className={`form-control ${
                            errors.youtube && touched.youtube
                              ? 'is-invalid'
                              : ''
                          }`}
                        />
                        <ErrorMessage name="youtube" component="div" className="invalid-feedback" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="gender" className="form-label">
                          <h4>Gender</h4>
                        </label>
                        <Field
                          as="select"
                          id="gender"
                          name="gender"
                          className={`form-control ${
                            errors.gender && touched.gender
                              ? 'is-invalid'
                              : ''
                          }`}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Field>
                        <ErrorMessage name="gender" component="div" className="invalid-feedback" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="date-of-birth" className="form-label">
                          <h4>Date of Birth</h4>
                        </label>
                        <Field
                          type="date"
                          id="date-of-birth"
                          name="date_of_birth"
                          className={`form-control ${
                            errors.date_of_birth && touched.date_of_birth
                              ? 'is-invalid'
                              : ''
                          }`}
                        />
                        <ErrorMessage name="date_of_birth" component="div" className="invalid-feedback" />
                      </div>
                      <button type="submit" className="btn btn-primary">
                      Save
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProfileForm;
