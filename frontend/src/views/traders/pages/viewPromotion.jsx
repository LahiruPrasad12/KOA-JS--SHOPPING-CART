import React, { useState, useEffect } from 'react'
import axios from "axios";
import '../../Home.css'


const ViewInventory = () => {
    const [promotion, setPromotion] = useState([]);
    const trader_id = JSON.parse(localStorage.getItem('trader_id'));
    useEffect(async() => {
        async function getPromotion(){
            const data = (await axios.get(`http://localhost:3000/traders/promotion/${trader_id}`)).data
            console.log(data)
            setPromotion(data)
        }
        await getPromotion()

    },[]);

    return (
        <div className="content mt-5">
            <h3>VIEW-PROMOTION</h3><hr />
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Item ID</th>
                    <th scope="col">Promotion code</th>
                    <th scope="col">Price</th>
                </tr>

                </thead>
                <tbody>
                {promotion.map((data)=>{
                    return <tr class="table-secondary" key={data.Id}>
                        <td >
                            {data.Id}
                        </td>
                        <td >
                            {data.data.promotion_code}
                        </td>
                        <td >
                            {data.data.promotion_price}%
                        </td>

                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
};

export default ViewInventory;