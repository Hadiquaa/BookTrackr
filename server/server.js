import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import logger from "./middleware/logger.js";
import router from './routes/bookRoutes.js';
dotenv.config();

const port = process.env.PORT || 8005;

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/api/books',router);

app.listen(port, () => {
    console.log(`Server running on pot ${port}`);
})