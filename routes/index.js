import express from 'express';
import userRoutes from './user';
import articleRoutes from './article';

const app = express();
const API_BASE_URL = '/api/v1';

app.use(`${API_BASE_URL}/auth`, userRoutes);
app.use(`${API_BASE_URL}/articles`, articleRoutes);

export default app;
