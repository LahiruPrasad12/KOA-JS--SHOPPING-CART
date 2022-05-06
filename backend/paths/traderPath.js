import Router from '@koa/router';
import {
    register,
    getOnePromotion,
    getAll,
    add_item,
    update,
    getOneItem,
    viewInventory,
    getAllCategories,
    viewPromotion,
    get_trader_item,
    get_all_item, add_promotion
} from '../service/traderService.js'


const tradePath = new Router({
    prefix: '/traders'
})


//Register User
tradePath.post('/', (ctx) => {
    try {
        const data = ctx.request.body
        ctx.body = register(data)
        ctx.set('Content-Type', 'Application.json')
        ctx.status = 201;
    } catch (e) {

    }
})

//Get all traders
tradePath.get('/', (ctx) => {
    ctx.body  = getAll()
    ctx.set('Content-Type', 'Application.json')
    ctx.status = 201;
})

//Add item
tradePath.post('/items', (ctx) => {

        const data = ctx.request.body
        ctx.body  = add_item(data)
        ctx.set('Content-Type', 'Application.json')
        ctx.status = 201;

})


//Get all items
tradePath.get('/items', (ctx) => {
    ctx.body = get_all_item()
    ctx.set('Content-Type', 'Application.json')
    ctx.status = 201;
})

//Get all relevant trader item
tradePath.get('/items/trader/:id', (ctx) => {
    const id = ctx.params.id
    ctx.body = get_trader_item(id)
    ctx.set('Content-Type', 'Application.json')
    ctx.status = 201;
})


//get one item
tradePath.get('/items/:id',(ctx)=>{
    const id = ctx.params.id
    ctx.body = getOneItem(id)
    ctx.set('Content-Type', 'Application.json')
    ctx.status = 201;
})




//update item
tradePath.put('/items/:id', (ctx) => {
        const id = ctx.params.id
        const data = ctx.request.body
        ctx.body = update(id, data)
        ctx.set('Content-Type', 'Application.json')
        ctx.status = 201;

})

//Get all items
tradePath.get('/inventory', (ctx) => {
    ctx.body = viewInventory()
    ctx.set('Content-Type', 'Application.json')
    ctx.status = 201;
})

//Get all items
tradePath.get('/categories', (ctx) => {
    ctx.body = getAllCategories()
    ctx.set('Content-Type', 'Application.json')
    ctx.status = 201;
})

//Add promotion
tradePath.post('/promotion', (ctx) => {
        const data = ctx.request.body
        ctx.body = add_promotion(data)
        ctx.set('Content-Type', 'Application.json')
        ctx.status = 201;

})

//Get all promotions
tradePath.get('/promotion/:id', (ctx) => {
    const id = ctx.params.id
    ctx.body = viewPromotion(id)
    ctx.set('Content-Type', 'Application.json')
    ctx.status = 201;
})

//get one promotion
tradePath.get('/promotion-one/:id',(ctx)=>{
    const id = ctx.params.id
    ctx.body = getOnePromotion(id)
    ctx.set('Content-Type', 'Application.json')
    ctx.status = 201;
})

export default traderRouter;