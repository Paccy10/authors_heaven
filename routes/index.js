import express from 'express';
import userRoutes from './user';
import articleRoutes from './article';
import reportRoutes from './report';

const app = express();
const API_BASE_URL = '/api/v1';

app.use(`${API_BASE_URL}/auth`, userRoutes);
app.use(`${API_BASE_URL}/articles`, articleRoutes);
app.use(`${API_BASE_URL}/report`, reportRoutes);

export default app;
