/*
	Defines the API route we are using.
*/
var url = '';

switch (process.env.NODE_ENV) {
	case 'development':
		url = 'https://www.astrolabparma.com/';
		break;
	case 'production':
		url = 'https://www.astrolabparma.com/';
		break;
}

export const CONFIG = {
	URL: url
}