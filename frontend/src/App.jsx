import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './home.jsx'
import CusRegister from './components/customer/pages/register'
import AllItems from './components/customer/pages/viewItem'
import CustomerSideNav from './navbar/customeSidenav'
import WishList from './components/customer/pages/viewWishList'
import Cart from './components/customer/pages/viewCart'
import TraderRegister from './components/traders/pages/register'
import AddItem from './components/traders/pages/addItem'
import TraderSideNav from './navbar/traderSideNav'
import ViewInventory from './components/traders/pages/ViewInvventory'
import ViewCustomer from './components/traders/pages/ViewCustomer'
import UpdateItem from './components/traders/pages/updateItem'
import AddPromotion from './components/traders/pages/AddPromotion'
import ViewPromotion from './components/traders/pages/viewPromotion'
function App() {
    return (
        <BrowserRouter>

            <Route exact path = "/"><Home/></Route>

            {/*Customer route*/}
            <Route exact path = "/customer/register"><CusRegister/></Route>
            <Route exact path = "/customer/view-items"><CustomerSideNav/><AllItems/></Route>
            <Route exact path = "/customer/view-wishlists"><CustomerSideNav/><WishList/></Route>
            <Route exact path = "/customer/view-carts"><CustomerSideNav/><Cart/></Route>

            {/*Trader route*/}
            <Route exact path = "/trader/register"><TraderRegister/></Route>
            <Route exact path = "/trader/add-new-item"><TraderSideNav/><AddItem/></Route>
            <Route exact path = "/trader/edit-item"><TraderSideNav/><UpdateItem/></Route>
            <Route exact path = "/trader/view-inventory"><TraderSideNav/><ViewInventory/></Route>
            <Route exact path = "/trader/view-customer"><TraderSideNav/><ViewCustomer/></Route>
            <Route exact path = "/trader/add-promotion"><TraderSideNav/><AddPromotion/></Route>
            <Route exact path = "/trader/view-promotion"><TraderSideNav/><ViewPromotion/></Route>




        </BrowserRouter>
    );
}

export default App;