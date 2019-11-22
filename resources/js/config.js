/*
	Defines the API route we are using.
*/
var url = '';

switch (process.env.NODE_ENV) {
	case 'development':
		url = 'https://astrolab.giovannibozzano.tk/';
		break;
	case 'production':
		url = 'https://astrolab.giovannibozzano.tk/';
		break;
}

export const CONFIG = {
	URL: url
}