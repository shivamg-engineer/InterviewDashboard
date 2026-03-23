import { useState } from "react";

const Exercise1=()=>{
const [isActive, setIsActive]= useState<boolean>(false);

const textStyle={
    color: isActive ? "green" : "red",
    fontSize:"20px",
    fontWeight:"bold",
    marginBottom:"12px"
}

const buttonStyle={
    backgroundColor: isActive ? "green" : "red",
    color:"#fff",
    border:"none",
    padding:"10px 16px",
    bordeRadius:"5px",
    cursor:"pointer"
}

    return  (
        <div>
            <h2 style={textStyle}> {isActive ? "Button is Active" : "Button is Inactive"}</h2>
            <button  style={buttonStyle} onClick={() => setIsActive((prev) => !prev)}>styled button</button>
        </div>
    )
}

export default Exercise1;