const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: 'HTTP Documentation',
        description: 'WZ talktowalls Meta APIs'
    },
    host:'localhost:8080',
    scheme:['http','https']
};

const outPutFile = "./swagger.json";
const endPointsFiles = ['./routes/index.js'];

swaggerAutogen (outPutFile, endPointsFiles, doc);