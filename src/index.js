import express from 'express';
import { config } from 'dotenv';
import cors from "cors";
import routes from './routes';




config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', routes);
app.set('x-powered-by', false);



const port = process.env.PORT || 3000 ;

app.all('*', (req, res) => res.status(404).json({
    success: false,
    message: 'The page you are looking for does not exist'
  }));

app.listen(port, () => console.log("Server Running..."));


export default  app;