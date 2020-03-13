import express from 'express';
import userRoutes from './user';

const app = express();
const API_BASE_URL = '/api/v1';

app.use(`${API_BASE_URL}/auth`, userRoutes);

export default app;
