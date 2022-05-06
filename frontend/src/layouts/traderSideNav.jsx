import React, { useState, useEffect } from 'react'
import "./customer.css"
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function TraderSideNav() {

    return (

        <div>

            <div className="sidebar">
                <Link to="/trader/add-new-item">ADD ITEMS</Link>
                <Link to="/trader/edit-item">EDIT ITEMS</Link>
                <Link to="/trader/view-inventory">INVENTORY</Link>
                <Link to="/trader/view-customer">CUSTOMER</Link>
                <Link to="/trader/add-promotion">ADD PROMOTION</Link>
                <Link to="/trader/view-promotion">VIEW PROMOTION</Link>
                <Link to="/" clssName={"mt-3"}>HOME</Link>
            </div>


        </div>
    )
}