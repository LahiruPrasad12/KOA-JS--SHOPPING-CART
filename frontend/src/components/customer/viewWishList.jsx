import React, { useState, useEffect } from 'react'
import axios from "axios";
import '../Home.css'

const ViewWishList = () => {
    const [wishList, setwishList] = useState([]);
    const user_id = JSON.parse(localStorage.getItem('user_id'));
    useEffect(async() => {
        async function getWishList(){
            const data = (await axios.get(`http://localhost:3000/customer/wish-list/${user_id}`)).data
            let newData = data.map(( item)=>{
                return{
                    id : item.Id,
                    name: item.data.name,
                    category:item.data.category,
                }

            })
            setwishList(newData)
        }
        await getWishList()

    },[]);

    const removeItemToWishlist=async(item)=>{
        try{
            const user_id = JSON.parse(localStorage.getItem('user_id'));
            const wishItem = {
                'user_id' : user_id,
                'item_id' : item.id,
                'isAdded':false
            };
            const data = (await axios.post("http://localhost:3000/customer/wish-list", wishItem)).data
        }catch (e){

        }
    }

    const addItemToCart= async(item)=>{
        try{
            const user_id = JSON.parse(localStorage.getItem('user_id'));
            const newItem = {
                'user_id' : user_id,
                'item_id' : item.id
            }
            const data = (await axios.post("http://localhost:3000/customer/cart-item", newItem)).data
            item.isAdded = true
        }catch (e){

        }
    }
    return (
        <div className="content mt-5">
            <h3>WISH-LIST</h3><hr />
            <div className="row">
                {wishList.map((data)=>{
                    return  <div className="col-sm-4 mt-3" key={data.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"> Category - {data.category} </h5>
                                <h5 className="card-title"> Name - {data.name} </h5>
                                <div className={"d-inline-flex"}>
                                    <div className={"float-start"}>
                                        <div className={"float-start"}>
                                            <button type="button" className="btn btn-primary float-end">Purchase Item</button>
                                        </div>
                                        <button type="button" className="btn btn-primary float-end" onClick={()=>addItemToCart(data)}>Add to cart</button>
                                    </div>
                                    <div>
                                        <input className="" type="checkbox" value="" id="flexCheckDefault" onChange={()=>removeItemToWishlist(data)}/>
                                        <label className="ml-2" >
                                            <h6>Remove from wishlist</h6>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}

            </div>
        </div>
    );
};

export default ViewWishList;