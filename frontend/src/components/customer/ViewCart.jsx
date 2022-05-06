import React, { useState, useEffect } from 'react'
import axios from "axios";
import '../Home.css'


const ViewCart = () => {
    const [item, setItem] = useState([]);
    const user_id = JSON.parse(localStorage.getItem('user_id'));
    useEffect(async() => {
        async function getCartItem(){
            const data = (await axios.get(`http://localhost:3000/customer/cart-item/${user_id}`)).data.dataToBeInsert
            let newData = data.map(( item)=>{
                return{
                    id : item.Id,
                    name: item.data.name,
                    category:item.data.category,
                }

            })
            setItem(newData)
        }
        await getCartItem()

    },[]);


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
    return (
        <div className="content mt-5">
            <h3>VIEW-CART</h3><hr />
            <div className="row">
                {item.map((data)=>{
                    return  <div className="col-sm-4 mt-3" key={data.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"> Category - {data.category} </h5>
                                <h5 className="card-title"> Name - {data.name} </h5>
                                <div className={"d-inline-flex"}>
                                    <div className={"float-start"}>
                                    <button type="button" className="btn btn-primary float-end">Purchase Item</button>
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
        </div>
    );
};

export default ViewCart;