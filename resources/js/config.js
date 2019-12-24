/*
	Defines the API route we are using.
*/
var url = '';

switch (process.env.NODE_ENV) {
	case 'development':
		url = 'https://test.astrolabparma.com/';
		break;
	case 'production':
		url = 'https://test.astrolabparma.com/';
		break;
}

export const CONFIG = {
	URL: url
}