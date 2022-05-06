import React, {useEffect, useState} from 'react'
import axios from "axios";
import validation from 'validator'
import SoloAlert from 'soloalert'

const AddItem = () => {
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const trader_id = JSON.parse(localStorage.getItem('trader_id'));
    useEffect(async() => {
        async function getCategory(){
            const data = (await axios.get(`http://localhost:3000/traders/categories`)).data
            console.log(data)
            setCategoryList(data)
        }
        await getCategory()

    },[]);

    const AddNewItem = async()=>{
        try{
            setLoading(true)
            if(!price || !name || !category ){
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please fill all fields",
                    icon: "error",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            }

            else {
                const newItem = {
                    category, name, price,trader_id
                }
                const data = (await axios.post("http://localhost:3000/traders/items", newItem)).data
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Item Added Successfully",
                    icon: "success",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });

            }

            setLoading(false)
        }catch (e){

        }
    }
    return (
        <div className="content mt-5">
            <h3>ADD-NEW-ITEM</h3><hr />
            <form className="mt-5">
                <div className="col-md-4 mt-5">
                    <input type="text" className="form-control" placeholder={"Enter name"}
                           onChange={(e) => { setName(e.target.value) }}  required/>
                </div>
                <div className="col-md-4 mt-3">
                    <input type="number" className="form-control" placeholder={"Enter price"}
                           onChange={(e) => { setPrice(e.target.value) }}  required/>
                </div>
                <div className="col-md-4 mt-3">
                    <select className="form-select" id="validationTooltip04" required onChange={(e) => {
                        setCategory(e.target.value)
                    }}>
                        <option selected disabled value="">Choose...</option>
                        {categoryList.map((category)=>{
                            return <option>
                                {category}
                            </option>
                        })}
                        {/*<option>Single</option>*/}

                    </select>
                </div>
                <div className="p-1">
                    <button type="button" className="btn btn-primary" onClick={AddNewItem} disabled={isLoading} >{isLoading ? 'Sending..' : 'Register Trader'}</button>
                    <button type="button" className="btn btn-secondary">Close</button>

                </div>
            </form>
        </div>
    );
};

export default AddItem;