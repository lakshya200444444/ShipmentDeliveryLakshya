import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../Providers/UserProvider'
import Spinner from './Spinner';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

function Orders({orders,refresh,setRefresh}) { 
  const [selectedOption,setSelectedOption] = useState({});
  const [users,setUsers] = useState([]);
  const {currUser,fetching} = useContext(UserContext);
  const [btnDisabled,setBtnDisabled] = useState({});
  const [currVal,setCurrVal] = useState({});

  function handleDelete(id){
    Swal.fire({
      title: "Are you sure you want to cancel the order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!"
    }).then((result) => {
      if (result.isConfirmed) {
          const data = {
            status:'cancelled'
          }
          axios.patch(`https://b9a12-server-side-khalid586.vercel.app/update/${id}`,data)
          .then(res => res.data)
          .then(data => {
              const {modifiedCount} = data;
              if(modifiedCount){
                  setRefresh(!refresh);
                  Swal.fire({
                      title: "Cancelled!",
                      text: "Order cancelled Successfully!",
                      icon: "success"
                  });
              }
          })
          .catch(err => console.error(err))
      }
    });
  } 

  function updateStatus(id){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!"
    }).then((result) => {
      if (result.isConfirmed) {
          const data = {
            status:'delivered'
          }
          axios.patch(`https://b9a12-server-side-khalid586.vercel.app/update/${id}`,data)
          .then(res => res.data)
          .then(data => {
              const {modifiedCount} = data;
              if(modifiedCount){
                  setRefresh(!refresh);
                  Swal.fire({
                      title: "Congratulations!",
                      text: "Order status updated Successfully!",
                      icon: "success"
                  });
              }
          })
          .catch(err => console.error(err))
      }
    }); 
  }

  function handleUpdate(id){
      const orderId = id; 
      console.log(currVal)
      const updatedData = {
        deliveredBy: {
          id: currVal.id,
          name: currVal.name,
        },
        status : "on the way",
      }
      axios.patch(`https://b9a12-server-side-khalid586.vercel.app/update/${id}`,updatedData)
      .then(({data})=>{
        if(data.modifiedCount){
          toast.success("Delivery man assigned successfully!")
          setRefresh(!refresh);
          setBtnDisabled(prev=>({...prev,[orderId]:true}))
        }
      })
      .catch(err => console.log(err)) 
  }

  function handleChange(e,orderId,deliveredBy){
    const currValue = JSON.parse(e.target.value);
    console.log(currValue);
    if(currValue.name == 'all'){ 
      setSelectedOption(prev => ({...prev,[orderId]:'Select a rider'})); 
    }

    if(currValue.name != deliveredBy.name && currValue.name !== 'all'){
      setBtnDisabled(prev => ({...prev,[orderId]:false}));
    }else{
      setBtnDisabled(prev => ({...prev,[orderId]:true}));
    }
        
    setCurrVal(currValue);
    console.log(currVal);
    setSelectedOption(prev => ({...prev,[orderId]:currValue.name}));
    console.log(selectedOption)
  }

  useEffect(()=>{
    axios.get('https://b9a12-server-side-khalid586.vercel.app/riders')
    .then(({data})=> {
      setUsers(data);
    })
  },[])

  return (
    <>    
      {
        fetching ? <Spinner></Spinner>:
        <div class="text-xs m-4 p-4 border-2 border-blue-600 rounded-lg shadow overflow-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parcel Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parcel  Weight</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receiver Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Address</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Time</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Man</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receiver's Phone</th>
                  {
                    currUser.role === 'admin' && status === 'pending' &&
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Riders</th>
                  }
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {orders.map((
                  {
                    _id,
                    orderTime,
                    deliveredBy,
                    phoneNumber,
                    parcelType,
                    parcelWeight,
                    receiverName,
                    receiverPhoneNumber,
                    parcelDeliveryAddress,
                    requestedDeliveryDate,
                    status
                  }
                )=> (
                  <tr key={_id}>
                    <td class="px-6 py-4 whitespace-nowrap"> {_id}</td>
                    <td class="px-6 py-4 whitespace-nowrap"> {parcelType}</td>
                    <td class="px-6 py-4 whitespace-nowrap"> {parcelWeight} kg</td>
                    <td>
                      <span class={`p-2 px-3 font-bold text-xs rounded-full whitespace-nowrap text-white
                       ${status === 'pending' 
                        ? 'bg-gray-800' :status === 'on the way' 
                        ? 'bg-yellow-400' : status === 'cancelled'?'bg-red-500':'bg-green-500'

                        }`}>
                        {status}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap"> {receiverName}</td>
                    <td class="px-6 py-4 whitespace-nowrap"> {parcelDeliveryAddress}</td>
                    <td class="px-6 py-4 whitespace-nowrap"> {orderTime}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-black font-bold"> {deliveredBy?.name === undefined?<p>pending</p>: deliveredBy.name}</td>
                    <td class="px-6 py-4 whitespace-nowrap"> {phoneNumber}</td>
                    <td class="px-6 py-4 whitespace-nowrap"> {requestedDeliveryDate}</td>
                    <td class="px-6 py-4 whitespace-nowrap"> {receiverPhoneNumber}</td>
                    { currUser.role === 'user' && status === 'pending' &&
                      <>
                        <td class="px-6 py-4 whitespace-nowrap"> <Link to = {`/update/${_id}`} class={`text-white px-4 ${status != 'pending'?'bg-gray-300 cursor-not-allowed':'bg-green-500'} py-2  rounded-xl hover:shadow-md`} disabled = {status !== 'pending'}>Update</Link></td>
                        <td class="px-6 py-4 whitespace-nowrap"> <button onClick={()=>handleDelete(_id)} class={`text-white px-4 ${status != 'pending'?'bg-gray-300 cursor-not-allowed':'bg-red-500'} py-2  rounded-xl hover:shadow-md`} disabled = {status !== 'pending'}>Cancel</button></td>
                      </>
                    }
                    { currUser.role === 'rider' && status === 'on the way' &&
                      <>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <
                            button onClick={()=>updateStatus(_id)}
                            class='btn px-4 py-2 bg-white border border-green-500 font-bold'
                          >
                            Delivered
                          </button>
                        </td>
                      </>
                    } 

                    {
                      currUser.role === 'admin' && ( status === 'on the way' ||status === 'pending' )&&
                      <>
                        <td>
                          <select  onChange={(e)=>handleChange(e,_id,deliveredBy)}>
                            <option value={JSON.stringify({id:'all',name:'all'})} >Select a rider</option>
                            {
                              users.map(
                                user => <option key={user._id} value={JSON.stringify({id:user._id,name:user.name})}>{user.name}</option>
                              )
                            }
                          </select>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap"><button key={_id} disabled = {btnDisabled[_id] == undefined?true:btnDisabled[_id]} class={`text-white ${!btnDisabled[_id] && btnDisabled[_id] != undefined ?'bg-green-500':"bg-green-200"} px-4 py-2 rounded-xl`} onClick={()=>handleUpdate(_id,deliveredBy)}>Assign</button></td>
                      </> 
                    }
                  </tr>
                ))}
              </tbody>
            </table>
            <ToastContainer></ToastContainer>
          </div>
      }
    </>
  )

}
export default Orders