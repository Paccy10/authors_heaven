import express from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import articleRoutes from './article';
import reportRoutes from './report';
import roleRoutes from './role';
import permissionRoutes from './permission';
import searchRoutes from './search';
import notificationRoutes from './notification';
import commentRoutes from './comment';

const app = express();
const API_BASE_URL = '/api/v1';

app.use(`${API_BASE_URL}/auth`, authRoutes);
app.use(`${API_BASE_URL}/users`, userRoutes);
app.use(`${API_BASE_URL}/articles`, articleRoutes);
app.use(`${API_BASE_URL}/report`, reportRoutes);
app.use(`${API_BASE_URL}/roles`, roleRoutes);
app.use(`${API_BASE_URL}/permissions`, permissionRoutes);
app.use(`${API_BASE_URL}/search`, searchRoutes);
app.use(`${API_BASE_URL}/notifications`, notificationRoutes);
app.use(`${API_BASE_URL}/comments`, commentRoutes);

export default app;
