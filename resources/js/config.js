/*
	Defines the API route we are using.
*/
var url = '';

switch (process.env.NODE_ENV) {
	case 'development':
		url = 'http://test.astrolabparma.com/';
		break;
	case 'production':
		url = 'http://test.astrolabparma.com/';
		break;
}

export const CONFIG = {
	URL: url
}