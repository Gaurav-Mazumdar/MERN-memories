import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import config from './utils/config.js';


const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if(process.env.NODE_ENV == 'production'){
    app.use(express.static(path.join(__dirname, "/client/build")));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}else{
    app.get('/', (req, res) =>{
        res.send("Hello to Memories Api");
    })
}

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false', {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false})
    .then(()=> app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
    .catch((err)=> console.log(err));
