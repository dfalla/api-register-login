import 'dotenv/config';
import './src/database/connectDB.js'; 
import express from 'express';
import userRouter from './src/routes/auth.route.js';

const app = express();
app.use(express.json());



app.use("/api/v1/auth",userRouter);
const PORT = 3306;
app.listen(PORT, ()=>console.log(`Servidor en marcha http://localhost:${PORT}`));