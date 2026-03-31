import { useState } from 'react'
import Countbutton from './Countbutton.jsx'
function Counter({count}){
    // let [count,setcount]=useState(0);
    // return(
    //     <div className="counter">
    //         <h1>Count:{count}</h1>
    //        <Countbutton setcount={setcount} count={count}/>
    //     </div>
    // )
    return(
        <>
        <h1>count:{count}</h1>
        
        </>
    )
}
export default Counter