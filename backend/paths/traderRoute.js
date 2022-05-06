import Router from '@koa/router';
import { register,getOnePromotion, getAll, addItem, update, getAllItems,getOneItem,viewInventory,getAllCategories,addPromotion,viewPromotion,getTraderItem } from '../service/tradeController.js'
import AppError from '../utils/AppError.js';
import respond from '../utils/respond.js'

const traderRouter = new Router({
    prefix: '/traders'
})


//Register User
traderRouter.post('/', (ctx) => {
    try {
        const data = ctx.request.body
        const res = register(data)
        respond(res, 201, ctx)
    } catch (e) {

    }
})

//Get all traders
traderRouter.get('/', (ctx) => {
    const res = getAll()
    respond(res,200,ctx)
})

//Add item
traderRouter.post('/items', (ctx) => {
    try {
        const data = ctx.request.body
        const res = addItem(data)
        respond(res, 201, ctx)

    } catch (e) {

    }
})


//Get all items
traderRouter.get('/items', (ctx) => {
    const res = getAllItems()
    respond(res,200,ctx)
})

//Get all relevant trader item
traderRouter.get('/items/trader/:id', (ctx) => {
    const id = ctx.params.id
    const res = getTraderItem(id)
    respond(res,200,ctx)
})


//get one item
traderRouter.get('/items/:id',(ctx)=>{
    const id = ctx.params.id
    const res = getOneItem(id)
    respond(res,200,ctx)
})




//update item
traderRouter.put('/items/:id', (ctx) => {
    try {
        const id = ctx.params.id
        const data = ctx.request.body
        const res = update(id, data)
        respond(res, 201, ctx)

    } catch (e) {

    }
})

//Get all items
traderRouter.get('/inventory', (ctx) => {
    const res = viewInventory()
    respond(res,200,ctx)
})

//Get all items
traderRouter.get('/categories', (ctx) => {
    const res = getAllCategories()
    respond(res,200,ctx)
})

//Add promotion
traderRouter.post('/promotion', (ctx) => {
    try {
        const data = ctx.request.body
        const res = addPromotion(data)
        respond(res, 201, ctx)

    } catch (e) {

    }
})

//Get all promotions
traderRouter.get('/promotion/:id', (ctx) => {
    const id = ctx.params.id
    const res = viewPromotion(id)
    respond(res,200,ctx)
})

//get one promotion
traderRouter.get('/promotion-one/:id',(ctx)=>{
    const id = ctx.params.id
    const res = getOnePromotion(id)
    respond(res,200,ctx)
})

export default traderRouter;