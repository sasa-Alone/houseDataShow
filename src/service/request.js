import axios from 'axios';

export default function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    return axios({
      url,
      withCredentials: true,
      ...options,
    })
      .then(response => {
        const { data } = response;
        if (data.code === 200 || data.code === 0) {
          resolve(data.data);
        } else {
          reject(data);
        }
      })
      .catch(response => {
        const { data } = response;
        reject(data);
      });
  });
}
