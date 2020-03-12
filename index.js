import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

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
