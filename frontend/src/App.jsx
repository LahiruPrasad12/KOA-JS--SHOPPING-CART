import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './home.jsx'
import CusRegister from './views/customer/pages/register'
import AllItems from './views/customer/pages/viewItem'
import CustomerSideNav from './layouts/customeSidenav'
import WishList from './views/customer/pages/viewWishList'
import Cart from './views/customer/pages/viewCart'
import TraderRegister from './views/traders/pages/register'
import AddItem from './views/traders/pages/addItem'
import TraderSideNav from './layouts/traderSideNav'
import ViewInventory from './views/traders/pages/ViewInvventory'
import ViewCustomer from './views/traders/pages/ViewCustomer'
import UpdateItem from './views/traders/pages/updateItem'
import AddPromotion from './views/traders/pages/AddPromotion'
import ViewPromotion from './views/traders/pages/viewPromotion'
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