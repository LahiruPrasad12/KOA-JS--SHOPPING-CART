import {randomUUID} from 'crypto'
const Trader = new Map()

const Item = new Map();
const Categories = [
    "Boys",
    "Girls"
]

const Inventory = new Map();

const Promotion = new Map()


//Register new trader
export const register = (data) => {
        const new_trader = { Id: randomUUID(), data }
        Trader.set(new_trader.Id, new_trader)
        return new_trader;

}


//Add new item
export const add_item = (data) => {
        const new_item = { Id: randomUUID(), data }
        Item.set(new_item.Id, new_item)

        let inventory = Inventory.get(data.category);

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
}

//get all items
export const get_all_item = (data) => {
        return [...Item.values()]

}

//get all items
export const get_trader_item = (id) => {
        let items = [...Item.values()]
        let data = []
        items.forEach((value,key)=>{
            if(value.data.trader_id === id){
                data.push(value)
            }
        })

        return data

}


// update item
export const update = (Id, data) => {
        if (!Item.has(Id)) {
            throw new Error(`Not found ${Id}`)
        }
        const item = { Id, data }
        Item.set(item.Id, item)
        return item
}


//get one item
export const getOneItem = (id) => {
        const item = Item.get(id)
        if (item) {
            return item;
        }
}


//Add  promotion
export const add_promotion = (data) => {

        const new_promotion = { Id: data.item_id, data }
        Promotion.set(new_promotion.Id, new_promotion)
        return new_promotion;

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
