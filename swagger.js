const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: 'HTTP Documentation',
        description: 'CSE 341 Final project\n Danny Ellis, Angie Pincock, Cristian Fabian Navia, Berny Fred',
    },
    host:'localhost:8080',
    scheme:['http','https']
};

const outPutFile = "./swagger.json";
const endPointsFiles = ['./routes/index.js'];

swaggerAutogen (outPutFile, endPointsFiles, doc);