import { getLoggedInUser } from './authUtils';

/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 */
const fetchJSON = (url, options = {}) => {
    const user = getLoggedInUser();
    if (user && user.id_token) {
        if (options.headers) {
            options.headers['Authorization'] = "Bearer " + user.id_token;
        } else {
            options.headers = { 'Authorization': "Bearer " + user.id_token};
        }
    }

    return fetch(url, options)
        .then(response => {
            if (!response.status === 200) {
                throw response.json();
            }

            const contentLength = response.headers.get('content-length');
            if (contentLength && contentLength === "0") return Promise.resolve('');

            return response.json();
        })
        .then(json => {
            return json;
        })
        .catch(error => {
            throw error;
        });
};

export { fetchJSON };
