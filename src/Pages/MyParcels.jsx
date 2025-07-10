import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Providers/AuthProvider'
import axios from 'axios';
import Title from '../Components/Title';
import Orders from '../Components/Orders';
import Spinner from '../Components/Spinner';
import { ref } from 'firebase/database';

function Myparcels() {
  const {user} = useContext(AuthContext);
  const [orders,setOrders] = useState([]);
  const [loading,setLoading] = useState(true);
  const [refresh,setRefresh] = useState(true);


  useEffect(()=>{
      if(user){
        const userData = {
          name:user.displayName,
          email:user.email,
        }
        axios.get('https://b9a12-server-side-khalid586.vercel.app/orders',{
          params:userData
        }).then(({data}) => {setOrders(data); setLoading(false);})
      }
  },[refresh])

  return (
    <div>
      <Title title="Deliver | Orders"></Title>
      <h1 class='text-center text-4xl m-8 mb-16 font-bold underline'>My Orders</h1>

      {
        loading ? <Spinner></Spinner> : orders.length ? <Orders orders = {orders} refresh={refresh} setRefresh={setRefresh}></Orders> : (<div class='text-center text-xl font-semibold text-red-500'>You don't have any orders</div>)
      }

    </div>
  )
}

export default Myparcels