import axios from 'axios';
import { getHeaders } from './src/utils';
import { BASE_PROFILE_URL, BASE_MEDIA_URL } from './src/constants';

export const getMedia = async (url) => {
  const headers = await getHeaders();

  const config = {
    method: 'POST',
    url: BASE_MEDIA_URL,
    headers,
    data: { url },
  };

  const data = await axios(config)
    .then(res => {
      const list = Array.isArray(res.data) ?
        res.data.map(post => post.sd?.url || post.thumb)
      :
        [res.data.url[0].url]

      return list;
    })
    .catch(err => {
      throw err;

      return ({
        error: err.message
      });
    });

  return data
};

export const getProfile = (username) => {
  const headers = await getHeaders();

  const config = {
    method: 'GET',
    url: BASE_PROFILE_URL + username,
    headers,
  };

  const data = await axios(config)
    .then(res => res.data.result)
    .catch(err => {
      throw err;

      return ({
        error: err.message
      });
    });
  
  return data
};

export const getBufferImage = async (url) => {
  const data = await axios({ 
    method: 'GET',
    url, 
    responseType: 'arraybuffer' 
  })
    .catch(err => {
      throw err;

      return ({
        error: err.message
      });
    });

  return data;
}
