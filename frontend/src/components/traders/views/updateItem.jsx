import React, { useState, useEffect } from 'react'
import axios from "axios";
import '../../Home.css'
import SoloAlert from "soloalert";


const EditItem = () => {
    const [items, setItem] = useState([]);
    const [editItems, setEditItem] = useState({});
    const [categoryList, setCategoryList] = useState([]);

    const [Id, setId] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");

    const trader_id = JSON.parse(localStorage.getItem('trader_id'));
    useEffect(async() => {
        async function getCustomers(){
            const data = (await axios.get(`http://localhost:3000/traders/items/trader/${trader_id}`)).data
            const category = (await axios.get(`http://localhost:3000/traders/categories`)).data
            console.log(data)
            setItem(data)
            setCategoryList(category)

        }
        await getCustomers()

    },[]);

    function selectItem(data) {
        setEditItem(data.data);
        setName(data.data.name)
        setCategory(data.data.category)
        setPrice(data.data.price)
        setId(data.Id)
    }

    async function updateItem(){
        const updatedItem = {
            category, name, price,trader_id
        }
        const data = (await axios.put(`http://localhost:3000/traders/items/${Id}`, updatedItem)).data
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

    return (
        <div className="content mt-5">
            <h3>VIEW-CUSTOMERS</h3><hr />



            <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">edit Item</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="text" className="form-control" value={name}
                                   onChange={(e) => { setName(e.target.value) }}  required/>
                            <input type="number" className="form-control" value={price}
                                   onChange={(e) => { setPrice(e.target.value) }}  required/>
                            <select className="form-select" id="validationTooltip04" value={category} required onChange={(e) => {
                                setCategory(e.target.value)
                            }}>
                                <option selected disabled value="">Choose...</option>
                                {categoryList.map((category)=>{
                                    return <option>
                                        {category}
                                    </option>
                                })}

                            </select>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={updateItem}>UpdateItem</button>
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
                                    data-bs-target="#exampleModal" onClick={(e) => { selectItem(data) }}>
                                Edit
                            </button>
                        </td>

                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
};

export default EditItem;