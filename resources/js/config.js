/*
	Defines the API route we are using.
*/
var url = '';

switch (process.env.NODE_ENV) {
	case 'development':
		url = 'http://localhost/';
		break;
	case 'production':
		url = 'https://astrolab-parma2020.azurewebsites.net/';
		break;
}

export const CONFIG = {
	URL: url
}
