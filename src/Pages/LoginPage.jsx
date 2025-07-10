import React, { useContext, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Providers/AuthProvider';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../Firebase/firebase.config';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaGoogle } from "react-icons/fa";
import { FaG } from 'react-icons/fa6';
import { FaGithub } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Helmet } from 'react-helmet';
import Spinner from '../Components/Spinner';
import SaveData from '../Utils/SaveData';


function LoginPage() {
    const {signIn,setLoading,user,loading} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [msg,setMsg] = useState('');
    const [show,setShow] = useState(false)


    const handleLogin = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        let ok = true;
        setMsg('')
        
        function isValidPassword(str) {
            return /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(str);
        }
        ok = isValidPassword(password)

        if(!ok){
            setMsg('Wrong password') 
            return;
        }

        signIn(email,password)
            .then(()=>{
                toast.success('Login Successful')
                setTimeout(()=>{
                    navigate(location?.state?location.state:'/')
                },2000)
            })
            .catch(error =>{toast.error(error.message); setLoading(false)})
    }

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const githubProvier = new GithubAuthProvider();

    const handleGoogleSignIn = (method) => {

        function navigateToPage(){
            toast.success('Login Successful')

            if(user){
                axios.put('https://b9a12-server-side-khalid586.vercel.app/users',user)
                .then(res => console.log(res.data))
                .then(err => console.log(err))
            }

            setTimeout(()=>{
                navigate(location?.state?location.state:'/')
            },1500)
        }

        if(method == 'google'){
            signInWithPopup(auth,provider)
                .then((result)=>{
                    console.log(result.user.displayName,result.user.email)
                    SaveData(result.user.displayName,result.user.email);
                    navigateToPage();
                })
                .catch(error => {toast.error(error.message); setLoading(false)})
        }else{
            signInWithPopup(auth,githubProvier)
                .then(()=>{
                    navigateToPage();
                })
                .catch(error => {toast.error(error.message); setLoading(false)})
        }
    }


    return (
        <>
            {    user?
                <>
                    <Navigate to = '/profile'></Navigate>
                </>
                :
        
            loading?  <Spinner></Spinner>
            :
            <>
            <Helmet>
                <title>
                    Deliver | Login
                </title>
            </Helmet>
            <div class='text-center text-4xl my-4 font-bold'>Login</div>

            <form onSubmit={handleLogin} class="max-w-sm mx-auto">
                <div class="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:">Your email</label>
                    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
                </div>
                <div class="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:">Your password</label>
                    <div class=''>
                        <div class='flex gap-2'>
                            <input type={show?"text":"password"} id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="******" required />
                            <button class='' type='button' onClick={()=>setShow(!show)}>
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

                <p class='my-4 font-semibold text-gray-400'>Don't have an account? <Link state={location?.state} class='text-black underline' to = '/register'>Register</Link></p>
                <button type="submit" class=" bg-green-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white">Login</button>
            
            </form>
            <div class='flex-col flex items-center gap-2 text-center my-16 '>
                
                <button class='text-white flex items-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-400 px-4 py-2 font-semibold ' onClick={()=>handleGoogleSignIn('google')}><FaGoogle class='text-violet-600'></FaGoogle>Login with Google</button>
            </div>

            <ToastContainer></ToastContainer>
        </>
        }
        </>

    )
}

export default LoginPage