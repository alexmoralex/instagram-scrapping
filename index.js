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

  axios(config)
    .then(res => {
      let list;

      if (Array.isArray(res.data)) list = res.data.map(post => post.sd?.url || post.thumb)
      else list = [res.data.url[0].url];

      return list;
    })
    .catch(err => {
      return ({
        error: err.message
      });
    });
};

export const getProfile = (username) => {
  const headers = await getHeaders();

  const config = {
    method: 'GET',
    url: BASE_PROFILE_URL + username,
    headers,
  };

  axios(config)
    .then(res => res.data.result)
    .catch(err => {
      return ({
        error: err.message
      });
    });
};

export const getBufferImage = async (url) => {
  const res = await axios({ 
    method: 'GET',
    url, 
    responseType: 'arraybuffer' 
  })

  return res
}
