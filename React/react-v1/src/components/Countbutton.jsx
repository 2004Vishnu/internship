import { useEffect, useState } from 'react'
import Counter from './Counter.jsx'
import Nav from './Nav.jsx';
// function Countbutton({setcount, count}){
//     return(
//         <button onClick={()=>setcount(count+1)}>Increment</button>
//     )
// }
const Countbutton=()=>{
    
    let [count,setcount]=useState(0);
    useEffect(() =>{console.log("value changed")},[count])
    return(
        <div className="counter">
            <Counter count={count}/>
           <button onClick={()=>setcount(count+1)}>Increment</button>
           <div>
            {
                count>2?(<Nav/>):(<p>The count is less than 2</p>)
            }
           </div>
        </div>
    )
}
export default Countbutton