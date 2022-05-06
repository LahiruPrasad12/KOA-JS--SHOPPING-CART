import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koajs-cors';

import traderRoutes from './paths/traderRoute.js'
import userRoutes from './paths/customerRoute.js'

const app = new Koa;
app.use(cors());
app.use(cors({
    origin: "http://localhost:1234"
}));

app.use(bodyParser());
app.use(traderRoutes.routes())
    .use(traderRoutes.allowedMethods())
app.use(userRoutes.routes())
    .use(userRoutes.allowedMethods())




app.use(ctx => {
    ctx.body = 'Not found'
    ctx.set('Content-Type', 'Application/json')
    ctx.status = 401;
})

app.listen(3000, () => {
    console.log('App is runing on port number 3000')
});