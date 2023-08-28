import axios from 'axios';
import { useEffect, useState } from 'react';

import BaseUrl from '../../../config';

/**
 * A custom hook for fetching project data and reviews based on a project slug.
 *
 * @param {string} slug - The slug of the project to fetch data for.
 * @returns {Object} An object containing project and reviews data.
 * @property {Object | null} project - The project data fetched based on the slug.
 * @property {Object | null} reviews - The reviews data fetched based on the project slug.
 */
const useProjectData = (slug) => {
  const [project, setProject] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    /**
     * Fetch project and reviews data from the API.
     *
     * @async
     */
    const fetchProject = async () => {
      try {
        // Fetch project data based on the provided slug
        const projectResponse = await axios.get(`${BaseUrl}/projects/${slug}/`);
        await setProject(projectResponse.data);

        // Fetch reviews data based on the same project slug
        const reviewResponse = await axios.get(`${BaseUrl}/projects/${slug}/reviews/`);
        await setReviews(reviewResponse.data);
      } catch (error) {
        // Handle any errors during the API request gracefully
        return {};
      }
    };

    // Call the fetchProject function when the slug or reviews change
    fetchProject();
  }, [slug, reviews]);

  // Return an object containing the project and reviews data
  return { project, reviews };
};

export default useProjectData;
