import axios from 'axios';
import { useEffect, useState } from 'react';

import BaseUrl from '../../../config';

/**
 * Custom hook for fetching profile data by slug.
 *
 * @param {string} slug - The slug of the profile to fetch.
 * @returns {object} An object containing the profile data and loading state.
 */
const useProfileData = (slug) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    /**
     * Fetches profile data from the server.
     *
     * @async
     */
    const fetch = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/profiles/${slug}`);
        await setProfile(response.data);
        await setIsLoading(false);
      } catch (error) {
        return null;
      }
    };
    fetch();
  }, [slug]);
  return { profile, isLoading };
};

/**
 * Calculates the age based on the birthdate.
 *
 * @param {string} birthdate - The birthdate in ISO format (e.g., "YYYY-MM-DD").
 * @returns {number} The calculated age.
 */
export function calculateAge(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);

  const todayYear = today.getFullYear();
  const birthYear = birthDate.getFullYear();
  const todayMonth = today.getMonth();
  const birthMonth = birthDate.getMonth();
  const todayDay = today.getDate();
  const birthDay = birthDate.getDate();

  let age = todayYear - birthYear;

  if (age > 0 && (todayMonth < birthMonth || (todayMonth === birthMonth && todayDay < birthDay))) {
    age--;
  }

  return age;
}

export default useProfileData;
