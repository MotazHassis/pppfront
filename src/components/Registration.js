import React, { useState,useEffect,useContext } from 'react'
import axios from 'axios';
import {
    Link,
    useNavigate ,
} from 'react-router-dom'
import { userInfo } from './Context';
export default () => {
const thisUser=useContext(userInfo)
const [username,setUsername]=useState('')
const [email,setemail]=useState('')
const [password,setpassword]=useState('')
const navigate = useNavigate();
const HandleSubmitUser=e=>{
    e.preventDefault();
    if(username){
        axios.post('https://pppserver.onrender.com/RegisterUser',{username,password,email})
        .then((response)=>{
            console.log(response.data._id)
            thisUser.setInfo(
                {username:response.data.username,
                userId:response.data._id}
            )
            navigate("/chat/"+response.data._id)
            console.log('done')})
        .catch((err)=>{
            console.log('fail sending data to backend')})
    }
}
return (
    <div className='border border-1 border-dark mt-3' >
        <h3>Get Started right Now!</h3>
        <h5>I want to start chatting with the name...</h5>
        <form className="mt-3 mb-3" onSubmit={HandleSubmitUser}>
            <div>
                <input className="mx-5" placeholder='name' type='text' onChange={e=>setUsername(e.target.value)} value={username} name='username'/>
            </div>
            <div>
                <input className="mx-5 mt-3 mb-2" placeholder='email' type='text' onChange={e=>setemail(e.target.value)} value={email} name='email'/>
            </div>
            <div>
                <input className="mx-5 mt-3 mb-2" placeholder='password' type='text' onChange={e=>setpassword(e.target.value)} value={password} name='password'/>
            </div>
            
            <button className="btn btn-success" type='submit'>Registre</button>
        </form>
        <button className="btn btn-success" onClick={()=>navigate('/')} type='button'>Sign In</button>
        
    </div>
)
}
