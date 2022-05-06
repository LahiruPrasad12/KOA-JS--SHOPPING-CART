import {randomUUID} from 'crypto'
const User = new Map()
const Cart = new Map()
const WishList = new Map()
const PurchaseItem = new Map()
import {Item} from "../Schema/traderSchema.js";

//Register new user
export const register = (data) => {
        const customer = { Id: randomUUID(), data }
        User.set(customer.Id, customer.data)
        return customer;
}

//Get all customer
export const get_all_customers = () => {
    return [...User.values()]
}



//Add item to card
export const add_to_cart=(Id,data)=>{
       let dataToBeInsert = []

       if(Cart.has(Id)){
           let alreadyItem = Cart.get(Id)
           dataToBeInsert = alreadyItem.dataToBeInsert
           dataToBeInsert.push(Item.get(data.item_id))
       }else {
           dataToBeInsert.push(Item.get(data.item_id))
       }
       const cartItem = { Id, dataToBeInsert }
    Cart.set(cartItem.Id,cartItem);
       return cartItem
}

//get cart
export const getCart = (id) => {
        return Cart.get(id);
}

//Add item to favourite
export const addOrRemoveItemToWishlist=(data)=>{
    let new_data = data
    let num=0
    if(!Item.has(data.item_id)){
        throw Error('please available valid item')
    }

    if(!User.has(data.user_id)){
        throw Error('unauthorized user')
    }
    WishList.forEach((value, key) => {
        if(value.new_data.user_id === data.user_id && value.new_data.item_id === data.item_id){
            WishList.delete(value.Id)
            num++
        }
    });
    if(num === 0){
        const wishItem = { Id : randomUUID(), new_data }
        WishList.set(wishItem.Id,wishItem);
        return wishItem;
    }

}

//get relevant user wish item
export const getWishItem = (id) => {
        let favItem = []
        WishList.forEach((value, key) => {
            if(value.new_data.user_id === id){
               const item = Item.get(value.new_data.item_id)
                favItem.push(item)
            }
        });
        return favItem;
}

//purchased item
export const purchaseItem = (data) => {
        const new_purchased_item = { Id: randomUUID(), data }
    PurchaseItem.set(new_purchased_item.Id, new_purchased_item)
        return new_purchased_item;
}
