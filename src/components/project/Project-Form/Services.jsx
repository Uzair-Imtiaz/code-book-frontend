import axios from 'axios';
import Cookies from 'js-cookie';

import BaseUrl from '../../../config';

/**
 * Submit a project form.
 *
 * @param {Object} values - The project data to be submitted.
 * @param {boolean} isEditForm - Indicates whether this is an edit form or an add form.
 * @param {string} slug - The slug of the project being edited (only applicable for edit forms).
 * @returns {Promise<{slug: string, success: boolean, message: {type: string, body: string}}>} A promise that resolves to an object containing the success status, the project's slug (if applicable), and a message.
 */
const handleFormSubmit = async (values, isEditForm, slug) => {
  const token = Cookies.get('access_token');
  try {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    if (values.image instanceof File) {
      formData.append('featured_image', values.image);
    }
    formData.append('youtube_link', values.youtube_link);
    formData.append('demo_link', values.demo_link);
    formData.append('source_code_link', values.source_code_link);
    if (!Array.isArray(values.tags)) {
      formData.append('skills', values.tags.split(', '));
    }

    const config = {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = isEditForm ?
      await axios.patch(`${BaseUrl}/projects/${slug}/`, formData, config) :
      await axios.post(`${BaseUrl}/projects/`, formData, config);

    if (response.status === 201 || response.status === 200) {
      return {
        slug: response.data.slug,
        success: true,
        message: {
          type: 'success',
          body: isEditForm ? 'Project updated successfully' : 'Project added successfully',
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      message: {
        type: 'danger',
        body: 'Could not add Project!',
      },
    };
  }
};

export default handleFormSubmit;
