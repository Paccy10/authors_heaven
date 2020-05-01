import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Undefined route'
    });
});

app.listen(port, () => {
    console.log(`Server started successfully on ${port}`);
});

export default app;
