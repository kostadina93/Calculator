const files = {

	in: {
		app: {
			js: [
                    "./app/controllers/app.js"
                ],
			css: [
                    "./app/css/styles.css"
                ]
		},
		vendor: {
			js: [
                    "node_modules/jquery/dist/jquery.min.js",
                    "node_modules/bootstrap/dist/js/bootstrap.min.js",
                    "node_modules/angular/angular.min.js"
                ],
			css: [
                    "node_modules/bootstrap/dist/css/bootstrap.min.css"
                ],
            templates: ["index.html"]
		},
        index: "./index.html"
	}
};

module.exports = files;
