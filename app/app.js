/* app.js
Sandra Bolos
301260176
02/09/2023 */


import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session  from 'express-session';


import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const port=3000;
import { Secret } from '../config/index.js';


import indexRouter from '../app/routes/index.js';
const app = express();


app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use('/css',express.static(__dirname +'public/css'))
app.use('/pdf',express.static(__dirname +'public/pdf'))
app.use('/imgages',express.static(__dirname +'public/images'))



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
    secret: Secret,
    saveUninitialized: false,
    resave: false
}));
app.use('/',indexRouter);

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
export default app;

app.listen(3000, () =>{console.log("running on 3000");
})