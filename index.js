import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Undefined route'
    });
});

app.listen(5000, () => {
    console.log('Server started successfully on 5000');
});

export default app;
