/*
	Imports the Roast API URL from the config.
*/
import { CONFIG } from '../../config.js';

export default {
	/*
		POST /api/v1/admin/pois/edit/{id}
	*/
	editPoi: function(id, name, image, description, address, coordinates, email_address, phone_number, website, hashtag, category_id, latitude, longitude) {
		/*
			Initialize the form data
		*/
		let formData = new FormData();

		/*
			Add the form data we need to submit
		*/
		formData.append('id', id);
		formData.append('name', name);
		if (image != null) {
			formData.append('image', image);
		}
		formData.append('description', description);
		formData.append('address', address);
		formData.append('coordinates', coordinates);
		formData.append('email_address', email_address);
		formData.append('phone_number', phone_number);
		formData.append('website', website);
		formData.append('hashtag', hashtag);
		formData.append('category_id', category_id);
		formData.append('latitude', latitude);
		formData.append('longitude', longitude);

		return axios.post(CONFIG.URL + 'api/v1/admin/pois/edit', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	},

	/*
		POST /api/v1/admin/pois/show/{id}
	*/
	showPoi: function(id) {
		return axios.post(CONFIG.URL + 'api/v1/admin/pois/show/' + id);
	},

	/*
		POST /api/v1/admin/pois/hide/{id}
	*/
	hidePoi: function(id) {
		return axios.post(CONFIG.URL + 'api/v1/admin/pois/hide/' + id);
	},

	/*
		POST /api/v1/admin/pois/delete/{id}
	*/
	deletePoi: function(id) {
		return axios.post(CONFIG.URL + 'api/v1/admin/pois/delete/' + id);
	},

	/*
		GET /api/v1/admin/pois/suggested
	*/
	getSuggestedPois: function() {
		return axios.get(CONFIG.URL + 'api/v1/admin/pois/suggested');
	},

	/*
		POST /api/v1/admin/pois/publish
	*/
	publishNewPoi: function(name, image, description, address, coordinates, email_address, phone_number, website, hashtag, category_id, latitude, longitude, suggestion_id) {
		/*
			Initialize the form data
		*/
		let formData = new FormData();

		/*
			Add the form data we need to submit
		*/
		formData.append('name', name);
		if (image != null) {
			formData.append('image', image);
		}
		formData.append('description', description);
		formData.append('address', address);
		formData.append('coordinates', coordinates);
		formData.append('email_address', email_address);
		formData.append('phone_number', phone_number);
		formData.append('website', website);
		formData.append('hashtag', hashtag);
		formData.append('category_id', category_id);
		formData.append('latitude', latitude);
		formData.append('longitude', longitude);
		formData.append('suggestion_id', suggestion_id);

		return axios.post(CONFIG.URL + 'api/v1/admin/pois/publish', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	},

	/*
		POST /api/v1/admin/pois/reject-suggested/{id}
	*/
	rejectSuggestedPoi: function(id) {
		return axios.post(CONFIG.URL + 'api/v1/admin/pois/reject-suggested/' + id);
	}
}