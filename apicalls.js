import express from 'express';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';


const swaggerDocument = YAML.load('./openapi/api.yaml');


const app = express();
app.use(express.json());

import index from './api/index.js';
import data from './api/data.js';

app.use('/', index);
app.use('/data', data);


app.use(cors());
const swaggerOptions = { } // specify if needed
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions))


export default app;