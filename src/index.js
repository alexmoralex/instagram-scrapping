import axios from 'axios'
import { BASE_URL, BASE_PROFILE_URL, BASE_MEDIA_URL } from './constants';

const getHeaders = async () => {
	const resp = await axios(BASE_URL);
	const cookie = resp.headers['set-cookie'];
	const session = cookie[0].split(';')[0].replace('XSRF-TOKEN=', '').replace('%3D', '')

	const headers = {
		'origin': 'https://instasupersave.com',
		'referer': 'https://instasupersave.com/pt/',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-origin',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52',
		'x-xsrf-token': session,
		'Content-Type': 'application/json',
		'Cookie': `XSRF-TOKEN=${session}; instasupersave_session=${session}`
	}

	return headers;
}

export const getMedia = (url_media) => {
	return new Promise(async (resolve, reject) => {
		try {
			const headers = await getHeaders();

			const config = {
				method: 'POST',
				url: BASE_MEDIA_URL,
				headers,
				data: {
					url: url_media
				}
			};

			axios(config).then((response) => {
				const ig = []
				if (Array.isArray(response.data)) {
					response.data.forEach(post => { ig.push(post.sd === undefined ? post.thumb : post.sd.url) })
				} else {
					ig.push(response.data.url[0].url)
				}

				resolve({
					results_number: ig.length,
					url_list: ig
				})
			})
				.catch(function (error) {
					reject(error.message)
				})
		} catch (e) {
			reject(e.message)
		}
	})
}

export const getProfile = (username) => {
	return new Promise(async (resolve, reject) => {
		try {
			const headers = await getHeaders();

			const config = {
				method: 'GET',
				url: BASE_PROFILE_URL + username,
				headers,
			};

			axios(config).then((response) => {
				resolve(response.data.result)
			})
				.catch(function (error) {
					reject(error.message)
				})
		} catch (e) {
			reject(e.message)
		}
	})
}
