const swaggerAutogen = require("swagger-autogen")();

const doc = {
	info: {
		title: 'HTTP Documentation',
		description:
			'CSE 341 Final project\n Danny Ellis, Angie Pincock, Cristian Fabian Navia, Berny Fred',
	},
	host: 'cse341-finalproject-60ke.onrender.com',
	scheme: ['https', 'http'],
};

const outPutFile = "./swagger.json";
const endPointsFiles = ['./routes/index.js'];

swaggerAutogen (outPutFile, endPointsFiles, doc);