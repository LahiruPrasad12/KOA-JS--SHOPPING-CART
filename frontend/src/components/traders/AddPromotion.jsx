import React, { useState, useEffect } from 'react'
import axios from "axios";
import '../Home.css'
import SoloAlert from "soloalert";


const AddPromotion = () => {
    const [items, setItem] = useState([]);
    const [item_id, setItemId] = useState('');



    const [promotion_code, promotionCode] = useState("");
    const [promotion_price, promotionValue] = useState("");


    const trader_id = JSON.parse(localStorage.getItem('trader_id'));
    useEffect(async() => {
        async function getCustomers(){
            const data = (await axios.get(`http://localhost:3000/traders/items/trader/${trader_id}`)).data
            setItem(data)

        }
        await getCustomers()

    },[]);



    async function addPromotion(e){
        e.preventDefault()
        const newPromotion = {
            promotion_code, promotion_price,item_id,trader_id
        }
        if(!promotion_code || !promotion_price){
            SoloAlert.alert({
                title: "Oops!",
                body: "fill all filed",
                icon: "error",
                theme: "dark",
                useTransparency: true,
                onOk: function () {
                    window.location.reload(false);
                },
            });
        }else {
            const data = (await axios.post(`http://localhost:3000/traders/promotion`, newPromotion)).data
            SoloAlert.alert({
                title: "Oops!",
                body: "Item Updated Successfully",
                icon: "success",
                theme: "dark",
                useTransparency: true,
                onOk: function () {
                    window.location.reload(false);
                },
            });
        }

    }

    return (
        <div className="content mt-5">
            <h3>ADD-PROMOTION</h3><hr />



            <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">edit Item</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="text" className="form-control" placeholder={"Enter Promotion Code"}
                                   onChange={(e) => { promotionCode(e.target.value) }}  required/>
                            <input type="number" className="form-control mt-3" placeholder={"Enter Price (it will save as percentage)"}
                                   onChange={(e) => { promotionValue(e.target.value) }}  required/>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary"  onClick={(e) => { addPromotion(e) }} >Add Promotion</button>
                        </div>
                    </div>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Price</th>
                </tr>

                </thead>
                <tbody>
                {items.map((data)=>{
                    return <tr class="table-secondary" key={data.Id}>
                        <td >
                            {data.data.name}
                        </td>
                        <td >
                            {data.data.category}
                        </td>
                        <td >
                            {data.data.price}
                        </td>
                        <td>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal" onClick={(e) => { setItemId(data.Id) }}>
                                Add Prom
                            </button>
                        </td>

                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
};

export default AddPromotion;