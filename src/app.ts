import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/module/student/student.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/v1/students', StudentRoutes);

const getAController = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', getAController);

export default app;
