const mainRoute = (request, response) => {
	response.set("Content-Type", "text/html");
	response.send("<h1>It's my first server!</h1>");
};


module.exports = mainRoute;
