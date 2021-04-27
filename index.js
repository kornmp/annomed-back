import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import projectRoutes from './routes/projects.js';

const app = express();

app.use('/projects', projectRoutes);

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

const CONNECTION_URL = 'mongodb+srv://test:123123test@annomed-backend.vubvx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is runnning on PORT ${PORT}`)))
    .catch((error) => console.error(error.message));

mongoose.set('useFindAndModify', false);