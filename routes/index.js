import express from 'express';
import userRoutes from './user';
import articleRoutes from './article';
import reportRoutes from './report';
import roleRoutes from './role';
import permissionRoutes from './permission';
import searchRoutes from './search';

const app = express();
const API_BASE_URL = '/api/v1';

app.use(`${API_BASE_URL}/auth`, userRoutes);
app.use(`${API_BASE_URL}/articles`, articleRoutes);
app.use(`${API_BASE_URL}/report`, reportRoutes);
app.use(`${API_BASE_URL}/roles`, roleRoutes);
app.use(`${API_BASE_URL}/permissions`, permissionRoutes);
app.use(`${API_BASE_URL}/search`, searchRoutes);

export default app;
