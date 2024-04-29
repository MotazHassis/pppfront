import React, { useState, useEffect, useRef, useContext } from 'react'
import { useParams } from "react-router";
import axios from 'axios';
import io from 'socket.io-client';
import { userInfo } from './Context';
import {
    useNavigate,
    Link,
    useLocation
} from 'react-router-dom'
export default () => {
    const navigate = useNavigate();
    const Location = useLocation
    const thisUser = useContext(userInfo)
    console.log(thisUser)
    const [thismessage, setthismessage] = useState('')
    const [allmessages, setAllmessages] = useState([])
    // const [thisuser, setthisuser] = useState(thisUser.info)
    // console.log(thisuser)
    const [newsocket, setNewSocket] = useState(null);
    const { id } = useParams()
    const socket = io('http://localhost:8000',{withCredentials: true});
    const updatemessages = updatemes => {
        setAllmessages(updatemes)
    }
    const scrollRef = React.useRef(null);
    const bottomMessages = React.useRef(null)
    const bringAllmessages=async()=>{
        await axios.get('http://localhost:8000/allchat',{withCredentials: true})
                    .then(res => {
                        setAllmessages(res.data)
                        console.log(socket)
                    })
                    .catch(() => {console.error('useEffect error ')
                    navigate('/')});
        }
    useEffect(() => {
        bringAllmessages()
        socket.on('receiveMessage', data => {
            updatemessages(data)
            if (bottomMessages.current) {
                bottomMessages.current?.scrollIntoView({ behavior: 'smooth' });
            }
        });
        console.log('Is this running?');
        // note that we're returning a callback function
        // this ensures that the underlying socket will be closed if App is unmounted
        // this would be more critical if we were creating the socket in a subcomponent
        return () => socket.disconnect(true);
    }, []);
    useEffect(() => {

        if (scrollRef.current) {
            // Access the current DOM node
            const element = scrollRef.current;
            // Set the scrollTop to the height of the content to scroll to bottom
            element.scrollTop = element.scrollHeight;
        }

    },)

    const sendmessagesio= async ()=>{
        await socket.emit('sendMessage', () => console.log('message updated'));
        
        }
    const HandleSend= async (id,thismessage)=>{
        await axios.post('http://localhost:8000/chat', { userid: id, messageContent: thismessage },{withCredentials: true})
        .then(async(res) => {
            sendmessagesio()
        })
        .catch(() => console.error('error send message'));
        }


    const handleSendMessage = e => {
        e.preventDefault();
        HandleSend(id,thismessage)
        setthismessage('')

    }
    const handleLogout =async ()=>{
        await axios.get('http://localhost:8000/logout')
            .then(res => {console.error(' logout done'
            )
            navigate('/')
            })
            .catch(() => console.error('error logout'));
    }
    
    return (

        <div className="align-items-center" id="singleChat1">
            <button onClick={()=>handleLogout()}>log out</button>
            <div >
                <div>
                    <div className="modal-header">
                        <div className="dropdown-item d-flex rounded" type="button" data-bs-container="body"
                            data-bs-toggle="popover" data-bs-placement="left"
                            data-bs-html="true">
                            <div>
                                <p className="m-0">Public Chat</p>
                            </div>
                        </div>
                        <i className="fas fa-video mx-2 text-muted pointer"></i>
                        <i className="fas fa-phone-alt mx-2 text-muted pointer"></i>
                    </div>
                    <div ref={scrollRef} className="modal-body p-0 mb-0 overflow-auto" style={{height: '60vh' }} id="mainform">
                        {allmessages.map((message, i) => {
                            if (message.senderid?._id == id) {
                                return (
                                    <li key={i} className="list-group-item border-0 d-flex">

                                        <div>
                                            <p className="m-2">{message.senderid?.username}</p>
                                        </div>

                                        <p style={{ backgroundColor: '#66686a' }} className="bg-secondary p-2 rounded text-white">{message.messageContent}</p>
                                    </li>

                                )
                            }
                            else {
                                return (
                                    <li key={i} className="list-group-item border-0 d-flex justify-content-end">
                                        <p style={{ backgroundColor: '#abbcd7' }} className="bg-gray p-2 rounded">{message.messageContent}</p>
                                        <div>
                                            <p className="m-2">{message.senderid?.username}</p>
                                        </div>
                                    </li>
                                )
                            }
                        })}
                        <div className='mt-5' ref={bottomMessages} />
                    </div>
                    <div className="modal-footer border-0">
                        <form onSubmit={handleSendMessage} className='d-flex'>
                            <div>
                                <div className="hero-button text-center">

                                </div>
                                <textarea cols="100" className="form-control" value={thismessage} onChange={e => setthismessage(e.target.value)} name='message' placeholder="Write messages here" id="floatingTextarea"> </textarea>
                                {/* <input  type="text" style={{ width: "auto" }} value={thismessage} onChange={e => setthismessage(e.target.value)} name='message' className="form-control rounded-pill border-0 bg-gray" placeholder="Aa" /> */}
                            </div>
                            <div className="d-flex align-items-center mx-2">
                                <button style={{ border: 'none', margin: '0', padding: '0' }} type='submit'
                                >
                                    <a href="#" className="btn btn-sm btn-success">
                                        <span style={{ fontSize: 'smaller' }}>Send</span>
                                    </a></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>




            )
}