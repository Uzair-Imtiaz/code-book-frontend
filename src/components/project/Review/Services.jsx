import axios from 'axios';

import BaseUrl from '../../../config';

/**
 * Submit a review for a project.
 *
 * @param user - The user adding a review.
 * @param {Object} formData - The review data to be submitted.
 * @param {string} slug - The slug of the project for which the review is being submitted.
 * @param {string} token - The authorization token for making the request.
 * @returns {Promise<{success: boolean, message: {type: string, body: string}}>} A promise that resolves to an object containing the success status and a message.
 */
const handleReviewSubmit = async (user, formData, slug, token) => {
  if (user.profile_slug) {
    return {
      success: false,
      message: {
        type: 'error',
        body: 'Complete your profile first',
      },
    };
  }
  try {
    const response = await axios.post(`${BaseUrl}/projects/${slug}/reviews/`, formData, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    if (response.status === 201) {
      return {
        success: true,
        message: {
          type: 'success',
          body: 'Review added.',
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      message: {
        type: 'error',
        body: 'Failed to add review.',
      },
    };
  }
};

export default handleReviewSubmit;
