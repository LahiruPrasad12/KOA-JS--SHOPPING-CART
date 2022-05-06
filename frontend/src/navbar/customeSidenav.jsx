import React, { useState, useEffect } from 'react'
import "./customer.css"
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CustomerSideNav() {

    return (

        <div>

            <div className="sidebar">
                <Link to="/customer/view-items">VIEW ITEMS</Link>
                <Link to="/customer/view-wishlists">VIEW WISHLIST</Link>
                <Link to="/customer/view-carts">VIEW CART</Link>
                <Link to="/" clssName={"mt-3"}>HOME</Link>
            </div>


        </div>
    )
}