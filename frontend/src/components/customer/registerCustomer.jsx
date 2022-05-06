import React, { useState } from 'react'
import axios from "axios";
import validation from 'validator'
import SoloAlert from 'soloalert'

const RegisterCustomer = () => {
    const [isLoading, setLoading] = useState(false);
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [mail, setmail] = useState("");
    const [phone, setphone] = useState("");
    const registerUser = async()=>{

        try{
            if(!fName || !lName || !phone  || !mail){
                alert('All fill is required')
            }else if(!validation.isEmail(mail)){
               alert('Email is required')
            }

            else {
                const newUser = {
                    fName, lName, phone, mail
                }
                const data = (await axios.post("http://localhost:3000/customer", newUser)).data
                localStorage.setItem('user_id',JSON.stringify(data.Id))
                window.location = '/customer/view-items'

            }


        }catch (e){

        }
    }
    return (
        <div className="container">
            <form className="mt-5">
                <div className="col-md-4 mt-5">
                    <input type="text" className="form-control" placeholder={"Enter first name"}
                           onChange={(e) => { setfName(e.target.value) }}  required/>
                </div>
                <div className="col-md-4 mt-3">
                    <input type="text" className="form-control" placeholder={"Enter last name"}
                           onChange={(e) => { setlName(e.target.value) }}  required/>
                </div>
                <div className="col-md-4 mt-3">
                    <input type="email" className="form-control" placeholder={"Enter email"}
                           onChange={(e) => { setmail(e.target.value) }}  required/>
                </div>
                <div className="col-md-4 mt-3">
                    <input type="number" className="form-control" placeholder={"Enter phone"}
                           onChange={(e) => { setphone(e.target.value) }}  required/>
                </div>
                <div className="p-1">
                    <button type="button" className="btn btn-primary" onClick={registerUser} disabled={isLoading} >{isLoading ? 'Sending..' : 'RegisterCustomer user'}</button>
                    <button type="button" className="btn btn-secondary">Close</button>

                </div>
            </form>
        </div>
    );
};

export default RegisterCustomer;