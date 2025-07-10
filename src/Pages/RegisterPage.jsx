
import React, { useContext, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { updateProfile } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { AuthContext } from '../Providers/AuthProvider';
import { Helmet } from 'react-helmet';
import Spinner from '../Components/Spinner';
import SaveData from '../Utils/SaveData';


function RegisterPage() {
    const {createUser,setLoading,user,loading} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [msg,setMsg] = useState('');
    const [show,setShow] = useState(false);


    function isValidPassword(str) {
        return /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(str);
    }
    
    function handleRegistration(e){
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photoUrl = e.target.photoUrl.value;
        
        let ok = true;
        setMsg('')
        
        ok = isValidPassword(password)

        if(!ok){
            setMsg('Password should have atleast 6 characters with atleast one uppercase and one lowercase letter') 
            return;
        }

        createUser(email,password)
            .then(result => {
                toast.success('Registration successful')
                updateProfile(result.user,{
                    displayName:name,
                    photoURL:photoUrl,
                }).then(()=>{
                    console.log(result.user.displayName,result.user.email);
                    SaveData(result.user.displayName,result.user.email);

                    setTimeout(()=>{
                        navigate(location?.state?location.state:'/')
                    },2000)
                }).catch(error => {toast.error(error.message);setLoading(false)})
                
            })
            .catch(error => {toast.error(error.message);setLoading(false)})
    }
    return (
        <>
        {    
        user?
            <>
                <Navigate to = '/profile'></Navigate>
            </>
        :
            loading? <Spinner></Spinner>
        :
        <>
            <Helmet>
                <title>Deliver | Register</title>
            </Helmet>
            <div class='text-center text-4xl my-4 font-bold'>Register</div>
            
            <form onSubmit={handleRegistration} class="max-w-sm mx-auto">
                <div class="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Your name</label>
                    <input type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john doe" required />
                </div>
                <div class="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
                </div>
                <div class="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                    <div class=''>
                        <div class='flex gap-2'>
                            <input type={show?"text":"password"} id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="******" required />
                            <button type='button' onClick={()=>setShow(!show)}>
                                {
                                    show? <FaEyeSlash></FaEyeSlash>:<FaEye></FaEye>
                                }
                            </button>
                        </div>
                        {
                            msg && 
                            <p class='text-red-500 text-xs font-semibold'>
                                {msg}
                            </p>
                        }
                    </div>
                </div>
                <div class="mb-5 ">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Photo Url</label>
                    <input type="text" id="photoUrl" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://picture.png"  required />
                </div>

                <p class='my-4 font-semibold text-gray-400'>Already have an account? <Link state={location.state} class='text-black underline' to = '/login'>Login</Link></p>
                <button type="submit" class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
            
            </form>
            <ToastContainer></ToastContainer>
        </>
    }
    </>
    )
}

export default RegisterPage