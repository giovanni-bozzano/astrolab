/*
	Defines the API route we are using.
*/
var api_url = '';

switch (process.env.NODE_ENV) {
	case 'development':
		api_url = 'http://localhost/api/v1';
		break;
	case 'production':
		api_url = 'https://astrolab-parma2020.azurewebsites.net/api/v1';
		break;
}

export const CONFIG = {
	API_URL: api_url
}
