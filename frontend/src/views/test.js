import React, { useState, useEffect } from 'react'
import axios from 'axios';
// import '../Home.css'

export default function SendFeedback() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);

    const save = async () => {
       let data = {
            name:"lahiru",
            age:"10",
        }
        await axios.post("http://localhost:3000/posts", data)
    }
    return (
        <div className="container">
            <form class="row g-3 needs-validation" novalidate>

                <div class="col-12">
                    <button class="btn btn-primary" type="submit" onClick={save()} >Submit form</button>
                </div>
            </form>
        </div>
    )
}
