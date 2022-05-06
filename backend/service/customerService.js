import {randomUUID} from 'crypto'
import {CartItem, User,WishList,PurchaseItem} from '../Schema/userSchema.js'
import {Item} from "../Schema/traderSchema.js";

//Register new user
export const register = (data) => {
    try {
        const new_trader = { Id: randomUUID(), data }
        User.set(new_trader.Id, new_trader)
        return new_trader;
    } catch (e) {
        throw new Error(e.message)
    }
}

//Get all customer
export const getAllUsers = () => {
    return [...User.values()]
}



//Add item to card
export const addItemToCart=(Id,data)=>{
       let dataToBeInsert = []
       if(!Item.has(data.item_id)){
           throw Error('please available valid item')
       }

    if(!User.has(data.user_id)){
        throw Error('unauthorized user')
    }

       if(CartItem.has(Id)){
           let alreadyItem = CartItem.get(Id)
           dataToBeInsert = alreadyItem.dataToBeInsert
           dataToBeInsert.push(Item.get(data.item_id))
       }else {
           dataToBeInsert.push(Item.get(data.item_id))
       }
       const cartItem = { Id, dataToBeInsert }
       CartItem.set(cartItem.Id,cartItem);
       return cartItem
}

//get  user cart
export const getCart = (id) => {
    try {
        return CartItem.get(id);
    } catch (e) {

    }
}

//Add item to wish list
export const addOrRemoveItemToWishlist=(data)=>{
    let dataToBeInsert = data
    let isHave = false
    if(!Item.has(data.item_id)){
        throw Error('please available valid item')
    }

    if(!User.has(data.user_id)){
        throw Error('unauthorized user')
    }
    WishList.forEach((value, key) => {
        if(value.dataToBeInsert.user_id === data.user_id && value.dataToBeInsert.item_id === data.item_id){
            WishList.delete(value.Id)
            isHave = true
        }
    });
    if(isHave === false){
        dataToBeInsert.is_wish = true
        const wishItem = { Id : randomUUID(), dataToBeInsert }
        WishList.set(wishItem.Id,wishItem);
        return wishItem;
    }else {
        return 'You removed item'
    }

}

//get relevant user wish item
export const getWishItem = (id) => {
    try {
        let userWishItem = []
        WishList.forEach((value, key) => {
            if(value.dataToBeInsert.user_id === id){
               const item = Item.get(value.dataToBeInsert.item_id)
                userWishItem.push(item)
            }
        });
        return userWishItem;
    } catch (e) {

    }
}

//Register new user
export const purchaseItem = (data) => {
    try {
        const new_purchased_item = { Id: randomUUID(), data }
        User.set(new_purchased_item.Id, new_purchased_item)
        return new_purchased_item;
    } catch (e) {
        throw new Error(e.message)
    }
}
