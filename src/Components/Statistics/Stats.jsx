import axios from 'axios';
import React, { useState } from 'react';

const Stats = () => {

    const [stats,setStats] = useState([])

    axios.get("http://localhost:3000/movies")
    .then((res)=>{
        const data = res.data
        setStats(data)
    })
    .catch((err)=>{
        console.log(err)
    })

    return (
        <div>
           {
            stats.length
           }
        </div>
    );
};

export default Stats;