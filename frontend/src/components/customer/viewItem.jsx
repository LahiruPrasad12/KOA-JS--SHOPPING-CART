import React, { useState, useEffect } from 'react'
import axios from "axios";
import '../Home.css'
import SoloAlert from "soloalert";


const ViewItem = () => {
    const [item, setItem] = useState([]);
    const [isAdd, setIsAdd] = useState(false)

    const [itemName, setitemName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setcategory] = useState("");
    const [promotionCode, setpromotionCode] = useState("");
    const [itemID, setItemID] = useState("");
    const [discount, setDiscount] = useState(0);
    const [TotalBill, setTotal] = useState(0);

    const user_id = JSON.parse(localStorage.getItem('user_id'));

    useEffect(async() => {
      async function getItem(){
           const data = (await axios.get("http://localhost:3000/traders/items")).data
           let newData = data.map(( item)=>{
               return{
                   id : item.Id,
                   name: item.data.name,
                   category:item.data.category,
                   price:item.data.price,
                   isAdded : false
               }

           })
          console.log(newData)
          setItem(newData)
        }
        getItem()

    },[]);

    const addItemToCart= async(item)=>{
        try{
            console.log(item)
            const user_id = JSON.parse(localStorage.getItem('user_id'));
            const newItem = {
                'user_id' : user_id,
                'item_id' : item.id,

            }
           const data = (await axios.post("http://localhost:3000/customer/cart-item", newItem)).data
            console.log('ava')
            item.isAdded = true
        }catch (e){

        }
    }

    const addItemToWishlist=async(item)=>{
       try{
           const user_id = JSON.parse(localStorage.getItem('user_id'));
           const wishItem = {
               'user_id' : user_id,
               'item_id' : item.id
           };
           const data = (await axios.post("http://localhost:3000/customer/wish-list", wishItem)).data
       }catch (e){

       }
    }

   async function purchasedItem(data){
       setitemName(data.name)
       setPrice(data.price)
       setItemID(data.id)
       setcategory(data.category)
       const prom = (await axios.get(`http://localhost:3000/traders/promotion-one/${data.id}`)).data
       if(prom.Id){
           setpromotionCode(prom.data.promotion_code)
           let discount = (data.price*(prom.data.promotion_price*1))/100
           let Total = data.price - discount
           setDiscount(prom.data.promotion_price)
           setTotal(Total)
       }else {
           setpromotionCode(null)

           setDiscount(0)
           setTotal(data.price)
       }
    }

   async function pusrchasedItem(e){
        e.preventDefault()
      let newPurchasedItem = {
            itemID,promotionCode,user_id
       }
        const data = (await axios.post("http://localhost:3000/customer/perched-item", newPurchasedItem)).data
       SoloAlert.alert({
           title: "Oops!",
           body: "Item purchased successfully",
           icon: "success",
           theme: "dark",
           useTransparency: true,
           onOk: function () {

           },
       });
    }
    return (
        <div className="content mt-5">
            <h3>VIEW-ITEMS</h3><hr />
            <div className="row">
                {item.map((data)=>{
                    return  <div className="col-sm-4 mt-3" key={data.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"> Category - {data.category} </h5>
                                <h5 className="card-title"> Name - {data.name} </h5>
                                <h5 className="card-title"> Price - {data.price} </h5>
                                <div className={"d-inline-flex"}>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                            data-bs-target="#exampleModal" onClick={()=>{purchasedItem(data)}}>
                                        Purchased
                                    </button>
                                    <div className={"float-start"}>
                                        <button type="button" className="btn btn-primary float-end" onClick={()=>addItemToCart(data)}>Add to cart</button>
                                    </div>
                                    <div>
                                        <input className="" type="checkbox" value="" id="flexCheckDefault" onChange={()=>addItemToWishlist(data)}/>
                                        <label className="ml-2" >
                                            <h6>wishlist</h6>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}

            </div>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title{TotalBill}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control" value={`Item is ${itemName}`}
                                   onChange={(e) => { setitemName(e.target.value) }} disabled={true}  required/>
                            <input type="text" className="form-control mt-3" value={`Price is ${price}`}
                                   onChange={(e) => { setPrice(e.target.value) }} disabled={true} required/>
                            <input type="text" className="form-control mt-3" value={`Category is ${category}`}
                                   onChange={(e) => { setcategory(e.target.value) }} disabled={true} required/>
                            <input type="text" className="form-control mt-3" placeholder={"Enter Promotion code"} disabled={true} hidden={discount===0} value={promotionCode}
                                   onChange={(e) => { setpromotionCode(e.target.value) }} required/>
                            <h4 class="text-center mt-5" hidden={discount===0}>Congratulation you have {discount}% discount for this item</h4>
                            <h4 className="text-center mt-5" hidden={discount !== 0}>Sorry! You didn't have any discount for this item</h4>
                            <h3 class="text-center mt-4">Total Bill = {TotalBill}</h3>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={(e)=>{pusrchasedItem(e)}}>Purchase Item</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewItem;