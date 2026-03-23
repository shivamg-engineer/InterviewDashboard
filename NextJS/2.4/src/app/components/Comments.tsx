'use client';

import { useState } from "react";

export default function Comments() {
    const [Comments, setComments] = useState<string[]>([]);
      const [input, setInput] = useState("");


      const addComment=()=>{
        if(!input.trim()) return;
        setComments([...Comments, input]);
        setInput("");
      }


      return(

        <div>
            <h2>Comments</h2>

            <input value={input} onChange={(e)=>  setInput(e.target.value)} placeholder="write a comment..."/>
            <button onClick={addComment}>Add</button>
            
            <ul>
                {Comments.map((comment, index)=>(
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
      )
}
