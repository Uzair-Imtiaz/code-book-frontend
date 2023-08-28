import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import './project-form.css';

import Layout from '../../base/Layout';
import { useMessage } from '../../context/MessageContext';
import SkillForm from '../../profile/Skill/Skill-form';
import useProjectData from '../Project-Detail/Services';

import handleFormSubmit from './Services';

/**
 * Component for creating or editing a project.
 *
 * @returns {JSX.Element} The JSX element representing the project form.
 */
function ProjectForm() {
  const token = Cookies.get('access_token');
  const [projectData, setProjectData] = useState(null);
  const [ isSkillFormVisible, setIsSkillFormVisible ] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let slug_ = location.state ? location.state.slug : null;
  const { setMessage } = useMessage();

  const { project, _ } = useProjectData(slug_);
  const isEditForm = !!slug_;

  useEffect(() => {
    if (!token) {
      setMessage({
        type: 'error',
        body: 'Log in first',
      });
      navigate('/login');
    }
    else if (project !== null) {
      setProjectData(project);
    }
  }, [project]);

  const initialValues = {
    title: projectData ? projectData.title : '',
    description: projectData ? projectData.description : '',
    /* eslint-disable camelcase */
    image: projectData ? projectData.featured_image : '',
    youtube_link: projectData ? projectData.youtube_link : '',
    demo_link: projectData ? projectData.demo_link : '',
    source_code_link: projectData ? projectData.source_code_link : '',
    tags: projectData ? projectData.skills : '',
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    youtube_link: Yup.string().url('Invalid YouTube link format'),
    demo_link: Yup.string().url('Invalid Demo link format'),
    source_code_link: Yup.string().url('Invalid Source Code link format'),
    /* eslint-enable camelcase */
  });

  if (isEditForm && !projectData) {
    return <p>...</p>;
  }


  const handleSubmit = async (values) => {
    const { slug, success, message } = await handleFormSubmit(values,isEditForm, slug_);
    setMessage({ ...message });
    if (success) {
      navigate(`/projects/${slug}`, { state: slug });
    }
  };


  return (
    <Layout>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header d-flex align-items-center">
                <button
                  style={{ border: 'none', background: 'none' }}
                  onClick={() => navigate(-1)}>
                  <ArrowBackIosIcon />
                </button>
                <h3 className="d-flex justify-content-center my-3">Add Project</h3>
              </div>
              <div className="card-body">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, setFieldValue, values }) => (
                    <Form encType="multipart/form-data">
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          <h4>Title</h4>
                        </label>
                        <Field
                          type="text"
                          id="title"
                          name="title"
                          className={`form-control ${
                            errors.title && touched.title ? 'is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="title" component="div" className="invalid-feedback" />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          <h4>Description</h4>
                        </label>
                        <Field
                          as="textarea"
                          id="description"
                          name="description"
                          rows="4"
                          className={`form-control ${
                            errors.description && touched.description ? 'is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="description" component="div" className="invalid-feedback" />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                          <h4>Featured Image</h4>
                        </label>
                        <input
                          type="file"
                          id="image"
                          name="image"
                          accept="image/*"
                          onChange={(event) => {
                            setFieldValue('image', event.target.files[0]);
                          }}
                          className={`form-control ${
                            errors.image && touched.image ? 'is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="image" component="div" className="invalid-feedback" />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="youtube_link" className="form-label">
                          <h4>YouTube Link</h4>
                        </label>
                        <Field
                          type="text"
                          id="youtube_link"
                          name="youtube_link"
                          className={`form-control ${
                            errors.youtube_link && touched.youtube_link ? 'is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="youtube_link" component="div" className="invalid-feedback" />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="demo_link" className="form-label">
                          <h4>Demo Link</h4>
                        </label>
                        <Field
                          type="text"
                          id="demo_link"
                          name="demo_link"
                          className={`form-control ${
                            errors.demo_link && touched.demo_link ? 'is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="demo_link" component="div" className="invalid-feedback" />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="source_code_link" className="form-label">
                          <h4>Source Code Link</h4>
                        </label>
                        <Field
                          type="text"
                          id="source_code_link"
                          name="source_code_link"
                          className={`form-control ${
                            errors.source_code_link && touched.source_code_link ? 'is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="source_code_link" component="div" className="invalid-feedback" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="tags" className="form-label upload-label">
                          <h4>Tags</h4>
                        </label>
                        <div className="position-relative">
                          <Field
                            as="textarea"
                            className="form-control"
                            id="tags"
                            name="tags"
                            rows="2"
                            value={Array.isArray(values.skills) ? values.skills.join(' ') : values.skills}
                            placeholder="Enter tags separated by space"
                          />
                          <Button
                            className="position-absolute top-0 end-0 mt-2 me-2"
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
                        <ErrorMessage name="tags" component="div"
                          className="invalid-feedback"/>
                        {Array.isArray(values.tags) ? (
                          <div className="tags-container my-2">
                            {values.tags.map((tag, index) => (
                              <div className="tag" key={index}>
                                {tag}
                                <button
                                  className="tag-close"
                                  onClick={() => {
                                    const updatedTags = [...values.tags];
                                    updatedTags.splice(index, 1);
                                    setFieldValue('tags', updatedTags.join(' '));
                                  }}
                                >
                                  <CloseIcon />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          values.tags && values.tags.split(' ').length > 0 && (
                            <div className="tags-container my-2">
                              {values.tags.split(' ').map((tag, index) => (
                                <div key={index} className="tag">
                                  {tag}
                                  {values.tags && (
                                    <button
                                      className="tag-close"
                                      onClick={() => {
                                        const updatedTags = values.tags.split(' ').map(t => t.trim());
                                        updatedTags.splice(index, 1);
                                        setFieldValue('tags', updatedTags.join(' '));
                                      }}
                                    >
                                      <CloseIcon />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          )
                        )}
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

export default ProjectForm;
