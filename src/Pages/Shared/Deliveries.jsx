import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Providers/UserProvider'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Orders from '../../Components/Orders';
import Title from '../../Components/Title';

function Deliveries() {
    const {currUser,fetching} = useContext(UserContext);
    const [deliveries,setDeliveries] = useState([]);
    const [refresh,setRefresh] = useState(true);
    
    const {id} = useParams();
    console.log(id)
    useEffect(()=>{
        if(!fetching){
            if(currUser.role === 'admin'){
                    axios.get(`https://b9a12-server-side-khalid586.vercel.app/deliveries`)
                    .then(({data})=>{
                        setDeliveries(data);
                    })
            }else{
                axios.get(`https://b9a12-server-side-khalid586.vercel.app/deliveries/${id}`)
                .then(({data})=>{
                    console.log(data)
                    setDeliveries(data); 
                })
                console.log('hit2')
            }
            console.log('hit')
        }
    },[fetching,refresh])

    return (
        <div>
            {
                currUser.role === 'admin' ? 
                <>                
                    <Title title = "Deliver | All Deliveries"></Title>
                    <p class='text-center text-3xl font-bold underline my-4'>All Deliveries</p>
                </>:
                <>
                    <Title title = "Deliver | My Deliveries"></Title>
                    <p class='text-center text-3xl font-bold underline my-4'>My Deliveries</p>                
                </>
            }
            <Orders orders={deliveries} refresh = {refresh} setRefresh = {setRefresh}></Orders>
        </div>
    )
}

export default Deliveries