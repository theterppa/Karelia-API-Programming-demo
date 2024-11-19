import express from 'express';
import {verifyToken} from './utils.js';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import index from './api/index.js';
import data from './api/data.js';
import login from './api/login.js';


const swaggerDocument = YAML.load('./openapi/api.yaml');
const swaggerOptions = { } // specify if needed
const app = express();

app.use(express.json());
app.use('/', index);
app.use('/data', verifyToken, data);
//app.use('/refresh', verifyRefreshToken, data);
app.use('/login', login);
app.use(cors());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions))


export default app;