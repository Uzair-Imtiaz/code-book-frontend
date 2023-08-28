import axios from 'axios';

import BaseUrl from '../../../config';

/**
 * Submits a profile form to create or update a user profile.
 *
 * @param {object} values - The form values including short_intro, bio, image, github, linkedin, youtube, skills, gender, and date_of_birth.
 * @param {string} token - The user's authentication token.
 * @param {boolean} isEditForm - A flag indicating if the form is for editing an existing profile.
 * @param {string} slug - The profile's slug.
 * @returns {Promise<{slug: string, success: boolean, message: {type: string, body: string}}>} - An object containing the slug, success status, and a message.
 */
const handleProfileSubmit = async (values, token, isEditForm, slug) => {
  try {
    const formData = new FormData();
    formData.append('short_intro', values.short_intro);
    formData.append('bio', values.bio);
    if (values.image instanceof File) {
      formData.append('profile_picture', values.image);
    }
    formData.append('github', values.github);
    formData.append('linkedin', values.linkedin);
    formData.append('youtube', values.youtube);
    if (!Array.isArray(values.skills)) {
      formData.append('skills', values.skills.split(', '));
    }
    formData.append('gender', values.gender);
    formData.append('date_of_birth', values.date_of_birth);

    const config = {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = isEditForm ?
      await axios.patch(`${BaseUrl}/profiles/${slug}/`, formData, config) :
      await axios.post(`${BaseUrl}/profiles/`, formData, config);
    if (response.status === 201 || response.status === 200) {
      return {
        slug: response.data.slug,
        success: true,
        message: {
          type: 'success',
          body: isEditForm ? 'Profile updated successfully' : 'Profile created successfully',
        },
      };
    }
  } catch (error) {
    if (error.response && error.response.status ) {
      return {
        success: false,
        message: {
          type: 'danger',
          body: error.response.data.error,
        },
      };
    }
  }
};

export default handleProfileSubmit;
