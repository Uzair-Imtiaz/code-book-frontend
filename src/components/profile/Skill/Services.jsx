import axios from 'axios';

import BaseUrl from '../../../config';

/**
 * Submits a new skill to the server.
 * @param {Object} formState - The form state containing skill information.
 * @param {string} formState.name - The name of the skill.
 * @param {string} formState.description - The description of the skill.
 * @returns {Promise<{ success: boolean, message: { type: string, body: string } }>} A promise that resolves with the submission result.
 */
const handleSkillSubmit = async (formState) => {
  const formData = new FormData();
  formData.append('name', formState.name);
  formData.append('description', formState.description);
  try {
    const response = await axios.post(`${BaseUrl}/skills/`, formData);
    if (response.status === 201) {
      return {
        success: true,
        message: {
          type: 'success',
          body: 'Skill added successfully',
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      message: {
        type: 'danger',
        body: 'Could not add skill',
      },
    };
  }
  console.log(formState);
};

export default handleSkillSubmit;
