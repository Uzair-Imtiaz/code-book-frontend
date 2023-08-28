import axios from 'axios';

import BaseUrl from '../../../config';

/**
 * Delete a project by its slug.
 *
 * @param {string} slug - The slug of the project to delete.
 * @param {string} token - The authorization token for the request.
 * @returns {Promise<Object>} A promise that resolves to an object with the result of the delete operation.
 */

const handleDelete = async (slug, token) => {

  try {
    const response = await axios.delete(`${BaseUrl}/projects/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (response.status === 204) {
      return {
        success: true,
        message: {
          type: 'success',
          body: 'Deleted successfully',
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      message: {
        type: 'danger',
        body: 'Failed to delete',
      },
    };
  }
};

export default handleDelete;
