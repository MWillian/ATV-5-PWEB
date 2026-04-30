import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join }  from 'path';
import { router } from '../src/routes/index.js';
import methodOverride from 'method-override';
import { naoEncontrado, middlewareDeErros } from '../src/middlewares/erros.middlewares.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views')); 

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(express.static(join(__dirname, '..', 'public')));
app.use('/api', router);

app.use(naoEncontrado);     
app.use(middlewareDeErros);

export default app;