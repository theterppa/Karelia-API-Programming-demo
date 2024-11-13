import express from 'express';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import index from './api/index.js';
import data from './api/data.js';
import login from './api/login.js';


const swaggerDocument = YAML.load('./openapi/api.yaml');


const app = express();
app.use(express.json());

app.use('/', index);
app.use('/data', data);
app.use('/login', login);


app.use(cors());
const swaggerOptions = { } // specify if needed
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions))


export default app;