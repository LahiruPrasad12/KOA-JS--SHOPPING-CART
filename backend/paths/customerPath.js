import Router from '@koa/router';
const cusPath = new Router({
    prefix: '/customer'
})


import {
    add_to_cart,
    handle_fav_item,
    get_all_customers,
    get_cart,
    get_fav_item,
    purchaseItem,
    register
} from "../service/customerService.js";

//Register User
cusPath.post('/', (ctx) => {
    try {
        const data = ctx.request.body
        ctx.body = register(data)
        ctx.set('Content-Type', 'Application.json')
        ctx.status = 201;
    } catch (e) {

    }
})


//Get all customer
cusPath.get('/', (ctx) => {
    ctx.body = get_all_customers()
    ctx.set('Content-Type', 'Application.json')
    ctx.status = 201;
})

//Add item to cart
cusPath.post('/cart-item', (ctx) => {
        const data = ctx.request.body
        if(!data.user_id){
            throw Error('unauthorized user')
        }
        const id = data.user_id
        ctx.body = add_to_cart(id,data)
        ctx.set('Content-Type', 'Application.json')
        ctx.status = 201;

})


cusPath.get('/cart-item/:id', (ctx) => {

        const id = ctx.params.id
        ctx.body = get_cart(id)
        ctx.set('Content-Type', 'Application.json')
        ctx.status = 200;
})



cusPath.post('/wish-list', (ctx) => {
        const data = ctx.request.body
        if(!data.user_id){
            throw Error('unauthorized user')

        }
    ctx.body = handle_fav_item(data)
    ctx.set('Content-Type', 'Application.json')
    ctx.status = 201;

})

cusPath.get('/wish-list/:id', (ctx) => {

        const id = ctx.params.id
    ctx.body = get_fav_item(id)
    ctx.set('Content-Type', 'Application.json')
    ctx.status = 200;

})

cusPath.post('/perched-item', (ctx) => {
        const data = ctx.request.body
        ctx.body = purchaseItem(data)
        ctx.set('Content-Type', 'Application.json')
        ctx.status = 200;

})

export default cusPath;