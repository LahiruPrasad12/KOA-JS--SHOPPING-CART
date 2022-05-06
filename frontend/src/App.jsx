import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './home.jsx'
import CusRegister from './components/customer/registerCustomer'
import AllItems from './components/customer/ViewAllItem'
import CustomerSideNav from './navbar/customeSidenav'
import WishList from './components/customer/ViewFavouriteList'
import Cart from './components/customer/ViewCart'
import TraderRegister from './components/traders/register'
import AddItem from './components/traders/addItem'
import TraderSideNav from './navbar/traderSideNav'
import ViewInventory from './components/traders/IventoryView'
import ViewCustomer from './components/traders/ViewCustomers'
import UpdateItem from './components/traders/UpdateMyItem'
import NewPromotion from './components/traders/NewPromotion'
import ViewPromotion from './components/traders/ViewMyPromotions'
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
            <Route exact path = "/trader/add-promotion"><TraderSideNav/><NewPromotion/></Route>
            <Route exact path = "/trader/view-promotion"><TraderSideNav/><ViewPromotion/></Route>




        </BrowserRouter>
    );
}

export default App;