import React, { useState, useEffect } from 'react'
import axios from "axios";
import '../Home.css'


const ViewInventory = () => {
    const [customer, setCustomer] = useState([]);
    useEffect(async() => {
        async function getCustomers(){
            const data = (await axios.get("http://localhost:3000/customer")).data
            console.log(data)
            setCustomer(data)
        }
        await getCustomers()

    },[]);

    return (
        <div className="content mt-5">
            <h3>VIEW-CUSTOMERS</h3><hr />
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">First name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Email</th>
                    <th scope="col">NIC</th>
                    <th scope="col">Phone</th>
                </tr>

                </thead>
                <tbody>
                {customer.map((data)=>{
                    return <tr class="table-secondary" key={data.Id}>
                        <td >
                            {data.data.fName}
                        </td>
                        <td >
                            {data.data.lName}
                        </td>
                        <td >
                            {data.data.mail}
                        </td>
                        <td >
                            {data.data.nic}
                        </td>

                        <td >
                            {data.data.phone}
                        </td>

                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
};

export default ViewInventory;