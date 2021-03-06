/*
	Imports the Roast API URL from the config.
*/
import { CONFIG } from '../../config.js';

export default {
	/*
		GET /api/v1/pois
	*/
	getPois: function() {
		return axios.get(CONFIG.URL + 'api/v1/pois');
	},

	/*
		GET /api/v1/pois/{id}/instagram/{endCursor}
	*/
	getPoiInstagramPosts: function(id, endCursor) {
		return axios.get(CONFIG.URL + 'api/v1/pois/' + id + '/instagram/' + endCursor);
	},

	/*
		GET /api/v1/instagram/{endCursor}
	*/
	getInstagramPosts: function(endCursor) {
		return axios.get(CONFIG.URL + 'api/v1/instagram/' + endCursor);
	},

	/*
		POST /api/v1/pois/suggest
	*/
	suggestNewPoi: function(id, name, description, address, email_address, phone_number, website, category_id, latitude, longitude) {
		/*
			Initialize the form data
		*/
		let formData = new FormData();

		/*
			Add the form data we need to submit
		*/
		formData.append('id', id);
		formData.append('name', name);
		formData.append('description', description);
		formData.append('address', address);
		formData.append('email_address', email_address);
		formData.append('phone_number', phone_number);
		formData.append('website', website);
		formData.append('category_id', category_id);
		formData.append('latitude', latitude);
		formData.append('longitude', longitude);

		return axios.post(CONFIG.URL + 'api/v1/pois/suggest', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	},

	/*
		POST /api/v1/pois/delete-suggested/{id}
	*/
	deleteUserSuggestedPoi: function(id) {
		return axios.post(CONFIG.URL + 'api/v1/pois/delete-suggested/' + id);
	}
}