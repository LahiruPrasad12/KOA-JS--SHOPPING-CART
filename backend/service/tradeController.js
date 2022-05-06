import {randomUUID} from 'crypto'
import {Categories, Inventory, Item, Promotion, Trader} from '../DB/TraderSchema.js'


//Register new trader
export const register = (data) => {
    try {
        const new_trader = { Id: randomUUID(), data }
        Trader.set(new_trader.Id, new_trader)
        return new_trader;
    } catch (e) {
        throw new Error(e.message)
    }
}


//Add new item
export const addItem = (data) => {
    try {
        const new_item = { Id: randomUUID(), data }
        Item.set(new_item.Id, new_item)
        console.log(data.category)
        // update inventory
        let inventory = Inventory.get(data.category);
        console.log(inventory)
        if(!inventory){
            let count = {
                count:1
            }
            Inventory.set(data.category,count)
        }else {
            let count = {
                count:++inventory.count
            }
            Inventory.set(data.category,count)
        }
        return new_item;
    } catch (e) {
        throw new Error(e.message)
    }
}

//get all items
export const getAllItems = (data) => {
    try {
        return [...Item.values()]
    } catch (e) {
        throw new Error(e.message)
    }
}

//get all items
export const getTraderItem = (id) => {
    try {
        let items = [...Item.values()]
        let data = []
        items.forEach((value,key)=>{
            console.log(value.data.trader_id)
            if(value.data.trader_id === id){
                data.push(value)
            }
        })
        // console.log(id)
        return data
    } catch (e) {
        throw new Error(e.message)
    }
}


// update item
export const update = (Id, data) => {
    try {
        if (!Item.has(Id)) {
            throw new Error(`Not found ${Id}`)
        }
        const item = { Id, data }
        Item.set(item.Id, item)
        return item
    } catch (e) {

    }
}


//get one item
export const getOneItem = (id) => {
    try {
        const item = Item.get(id)
        if (item) {
            return item;
        }
    } catch (e) {

    }
}


//Add  promotion
export const addPromotion = (data) => {
    try {
        const new_promotion = { Id: data.item_id, data }
        Promotion.set(new_promotion.Id, new_promotion)
        return new_promotion;
    } catch (e) {
        throw new Error(e.message)
    }
}


//get one promotion
export const getOnePromotion = (id) => {
    try {
        return Promotion.get(id);
    } catch (e) {

    }
}


//Get all traders
export const getAll = () => {
    return [...Trader.values()]
}

//Get all categories
export  const getAllCategories = ()=>{
    return [...Categories.values()]
}
//Get all inventories
export const viewInventory = () => {
    return [...Inventory.entries()]
}

//Get all promotion
export const viewPromotion = (id) => {
    let promotion = [...Promotion.values()]
    let data = []
    promotion.forEach((value,key)=>{
        console.log(value.data.trader_id)
        if(value.data.trader_id === id){
            data.push(value)
        }
    })
    // console.log(id)
    return data
}


// export const remove = (Id) => {
//     if (!trader.has(Id)) {
//         throw new Error(`Not found ${Id}`)
//     }
//     const data = trader.delete(Id)
//     return data
// }
