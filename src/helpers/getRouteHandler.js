const url = require("url");

const getClearUrl = (url, query) => {
	// url example : `/user/12345`
	const lastIndex = url.lastIndexOf('/');
	const idString = url.slice(lastIndex + 1).trim();
	const idNumber = +idString;

	if (idNumber || (query && lastIndex !== -1)) {
		return url.slice(0, lastIndex);
	}

	return url;
};

const getRouteHandler = (routerConfig, url, query) => {
	const clearUrl = getClearUrl(url, query);
	console.log(clearUrl)
	return routerConfig[clearUrl];
};

module.exports = getRouteHandler;