import React, { useState,useEffect,useContext } from 'react'
import axios from 'axios';
import {
    Link,
    useNavigate ,
} from 'react-router-dom'
import io from 'socket.io-client';
export default (props) => {
const [right,setright]=useState(0)
const [left,setleft]=useState(0)
const [liveright,setliveright]=useState(0)
const [liveleft,setliveleft]=useState(0)
const navigate = useNavigate();
// const socket = io('https://pppserver.onrender.com');
const Base_url='https://pppserver.onrender.com/'
const id='66301ed333673cf71878ec51'
// const HandleSubmitwing=e=>{
//     e.preventDefault();
//         axios.post('http://localhost:8000/create_wing',{left,right})
//         .then((response)=>{
//             console.log(response.data._id)
//             console.log('done')})
//         .catch((err)=>{
//             console.log('fail sending data to backend')})
//     }

// const updatedata=(data)=>{
//     setright(data.right)
//     setleft(data.left)
// }
useEffect(() => {
    axios.get(Base_url+'mywing/readings')
            .then((response)=>{
                
                setright(response.data.right)
                setleft(response.data.left)
                console.log(response.data.right)
                console.log(response.data.left)
                console.log('done')})
            .catch((err)=>{
                console.log('fail sending data to backend')})
}, []);

// useEffect(() => {
//     socket.on('getwingdata', data => {
//         updatedata(data)
        
//     });
//     console.log('Is this running?');
//     return () => socket.disconnect(true);
// }, []);

// const sendmdatasio= async ()=>{
//     await socket.emit('senddata', () => console.log('message updated'));
    
//     }

    const HandleSubmitupdatewing=e=>{
        e.preventDefault();
            axios.put(Base_url+'myupdate/readings',{left,right})
            .then((response)=>{
                console.log('done')})
                // sendmdatasio()
            .catch((err)=>{
                console.log('fail sending data to backend')})
        }
return (
    <div className='border border-1 border-dark mt-3' >
        <h3>Lets start!</h3>
       
        
        <h3>liveright: {right}</h3>
        <h3>liveleft: {left}</h3>
        

        {/* <form className="mt-3 mb-3" onSubmit={HandleSubmitwing}>
            <div>
                <input className="mx-5" placeholder='right' type='number' onChange={e=>setright(e.target.value)} value={right} name='right'/>
            </div>
            <div>
                <input className="mx-5 mt-3 mb-2" placeholder='left' type='text' onChange={e=>setleft(e.target.value)} value={left} name='left'/>
            </div>
            <button className="btn btn-success" type='submit'>Registre</button>
        </form> */}
        {/* <button className="btn btn-success" onClick={()=>navigate('/')} type='button'>Sign In</button> */}
        <h5>update</h5>
        <form className="mt-3 mb-3" onSubmit={HandleSubmitupdatewing}>
            <div>
                <h2>Right Controller</h2>
                <label htmlFor="right">Select Right Angle:</label>
                <input type="range" id="right" name="right" min="0" max="180" 
                onChange={(e)=>{
                    setright(e.target.value)
                    axios.put(Base_url+'myupdate/readings',{left,right})
                    .then((response)=>{console.log('done')})
                    .catch((err)=>{
                    console.log('fail sending data to backend')})
                    }} 
                    value={right} step="1"/>
                <p>Right Angle Value: <span id="rightValue">{right}</span></p>
            </div>
            <div>
                <h2>Left Controller</h2>
                <label htmlFor="left">Select Right Angle:</label>
                <input type="range" id="left" name="left" min="0" max="180"
                onChange={(e)=>{
                    setleft(e.target.value)
                    axios.put(Base_url+'myupdate/readings',{left,right})
                    .then((response)=>{console.log('done')})
                    .catch((err)=>{
                    console.log('fail sending data to backend')})
                    }} 
                value={left} step="1"/>
                <p>Left Angle Value: <span id="leftValue">{left}</span></p>
            </div>
            <button className="btn btn-success" type='submit'>Registre</button>
        </form>
        {/* <button className="btn btn-success" onClick={()=>navigate('/')} type='button'>Sign In</button> */}
        
    </div>
    
)
}
