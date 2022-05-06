import Router from '@koa/router';
import {register, getAllUsers,addItemToCart,getCart,addOrRemoveItemToWishlist,getWishItem,purchaseItem} from "../contrllers/customerController.js";
import respond from "../utils/respond.js";
import traderRouter from "./traderRoute.js";

const userRouter = new Router({
    prefix: '/customer'
})

//Register User
userRouter.post('/', (ctx) => {
    try {
        const data = ctx.request.body
        const res = register(data)
        respond(res, 201, ctx)
    } catch (e) {

    }
})


//Get all customer
userRouter.get('/', (ctx) => {
    const res = getAllUsers()
    respond(res,200,ctx)
})

//Add item to cart
userRouter.post('/cart-item', (ctx) => {
    try {
        const data = ctx.request.body
        if(!data.user_id){
            respond('user id is required', 400, ctx)
        }
        const id = data.user_id
        const res = addItemToCart(id,data)
        respond(res, 201, ctx)
    } catch (e) {
        respond(e.message, 400, ctx)
    }
})

//Get all cart
userRouter.get('/cart-item/:id', (ctx) => {
    try{
        const id = ctx.params.id
        const res = getCart(id)
        respond(res,200,ctx)
    }catch (e){

    }
})


//Add or remove item to wishlist
userRouter.post('/wish-list', (ctx) => {
    try {
        const data = ctx.request.body
        if(!data.user_id){
            respond('user id is required', 400, ctx)
        }
        const res = addOrRemoveItemToWishlist(data)
        respond(res, 201, ctx)
    } catch (e) {
        respond(e.message, 400, ctx)
    }
})

userRouter.get('/wish-list/:id', (ctx) => {
    try{
        const id = ctx.params.id
        const res = getWishItem(id)
        respond(res,200,ctx)
    }catch (e){

    }
})

userRouter.post('/perched-item', (ctx) => {
    try{
        const data = ctx.request.body
        const res = purchaseItem(data)
        respond(res,200,ctx)
    }catch (e){

    }
})

export default userRouter;