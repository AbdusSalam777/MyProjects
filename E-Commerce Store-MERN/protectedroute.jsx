import { Navigate } from "react-router-dom";
import { useState,useEffect } from "react";

function ProtectetRoute({children}){

    const [auth,setauth] = useState(null);

    useEffect(()=>{
        fetch("http://localhost:3000/verify",{

            method:"GET",
            credentials:"include",

        })
        .then((res)=>setauth(res.ok)).
        catch(()=>setauth(false))
    },[]);

    if(auth===null){
        return(<p className="text-center mt-[50px] font-semibold text-2xl">Loading . . .</p>)
    }
    if(auth===false){
        return <Navigate to="/login"></Navigate>
    }

    return children;

}
export default ProtectetRoute;