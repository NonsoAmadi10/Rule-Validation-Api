import express from 'express';
import { config } from 'dotenv';

config();
const app = express();


const port = 3000 ;

app.listen(port, () => console.log("Server Running..."));