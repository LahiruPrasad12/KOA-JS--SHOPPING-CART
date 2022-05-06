import React, { useState } from 'react'
import axios from "axios";
import validation from 'validator'
import SoloAlert from 'soloalert'

const Register = () => {
    const [isLoading, setLoading] = useState(false);
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [mail, setmail] = useState("");
    const [phone, setphone] = useState("");
    const [nic, setnic] = useState("");
    const registerUser = async()=>{

        try{
            setLoading(true)
            if(!fName || !lName || !phone || !nic || !mail){
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please fill all field",
                    icon: "error",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            }else if(!validation.isEmail(mail)){
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please enter valid mail address",
                    icon: "error",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            }

            else {
                const newTrader = {
                    fName, lName, phone, nic, mail
                }
                const data = (await axios.post("http://localhost:3000/traders", newTrader)).data
                localStorage.setItem('trader_id',JSON.stringify(data.Id))
                window.location = '/trader/add-new-item'

            }

            setLoading(false)
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
                <div className="col-md-4 mt-3">
                    <input type="text" className="form-control" placeholder={"Enter NIC"}
                           onChange={(e) => { setnic(e.target.value) }}  required/>
                </div>
                <div className="p-1">
                    <button type="button" className="btn btn-primary" onClick={registerUser} disabled={isLoading} >{isLoading ? 'Sending..' : 'Register Trader'}</button>
                    <button type="button" className="btn btn-secondary">Close</button>

                </div>
            </form>
        </div>
    );
};

export default Register;