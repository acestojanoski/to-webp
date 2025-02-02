import ky, { HTTPError } from "ky";

/**
 * @param {string} url
 */
const fetchImage = async (url) => {
  try {
    return await ky.get(url).arrayBuffer();
  } catch (error) {
    if (error instanceof HTTPError && error.response?.status === 404) {
      return null;
    }

    throw error;
  }
};

const repository = {
  fetchImage,
};

export default repository;
