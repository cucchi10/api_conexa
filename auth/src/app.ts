import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { portAuth } from './config/config';
import { routes } from './routes';
import dbConnect from './config/db';
import cacheConnect from './config/cache';
import { errorHandler } from './utils/errorHandler.handle';
import compression from 'compression';
import helmet from 'helmet';

const app: express.Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression()); // response
app.use(helmet()); // middleware HTTP

routes.map((route) => app.use(route.basePath, route.router));

// Main errorHandler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorHandler(error, req, res, next);
});

// assume 404 since no middleware responded
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({
    code: 404,
    message: 'Not found',
    success: false,
    data: [],
  }).end();
});

dbConnect().then(() => console.log('Conexion with Mongoose at ready'));
cacheConnect()

app.listen(portAuth, () => {
  console.log(`App listening at ${portAuth}`);
});