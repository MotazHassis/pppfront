import { createContext,useState } from "react";

export const userInfo=createContext({});

export default function UserInfoProvide({children}){
    const [info, setInfo]=useState({});
    return <userInfo.Provider value={{info,setInfo}}>{children}</userInfo.Provider>
}