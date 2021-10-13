const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');
const Router = require('koa-router');

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        console.log(error);
        ctx.body = 'Internal Error';
    }
})

const router = new Router({
    prefix: '/api',
});

router.get('/test/:id', async (ctx, next) => {
    ctx.body = ctx.params.id;
    await next();
});

app.use(router.routes());

app.use(cors());
app.use(bodyparser());

app.listen(8000, (args) => console.log('is working'));