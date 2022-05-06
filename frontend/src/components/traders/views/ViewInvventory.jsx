import React, { useState, useEffect } from 'react'
import axios from "axios";
import '../../Home.css'


const ViewInventory = () => {
    const [item, setInventory] = useState([]);
    const [isAdd, setIsAdd] = useState(false)
    useEffect(async() => {
        async function getInventory(){
            const data = (await axios.get("http://localhost:3000/traders/inventory")).data
            console.log(data)
            setInventory(data)
        }
        await getInventory()

    },[]);

    return (
        <div className="content mt-5">
            <h3>VIEW-INVENTORY</h3><hr />
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Stock</th>
                </tr>

                </thead>
                <tbody>
                {item.map((data)=>{
                    return <tr class="table-secondary">
                        <td >
                            {data[0]}
                        </td>
                        <td >
                            {data[1].count}
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
};

export default ViewInventory;