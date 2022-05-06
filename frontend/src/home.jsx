import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <Link to='/customer/register'>Customer</Link><br/>
            <Link to='/trader/register'>Trader</Link>
        </div>
    );
};

export default Home;