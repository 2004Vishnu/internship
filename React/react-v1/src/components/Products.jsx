import './Products.css'
import { useState, useEffect } from 'react'

function Products(){
useEffect(() =>{
    Fetchdata();
},[])
const [data,setData]=useState([]);
function Fetchdata(){

    fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
         console.log(data);
        setData(data.products)})
    .catch((err)=> console.log(err))
   
}

    return(
        <>
        <div className='p1'>
        {
            data.map((prod) => (
                <div key={(prod.id)} className='prodcard'>
                <p>{prod.title}</p>
                <img src={prod.thumbnail} alt="" />
                <h1>{prod.name}</h1>
                <p className='amt'>¥{prod.price} <span className='star'>⭐{prod.rating}</span></p>
                <div className='btn'>
                <button className='cart'>Add to cart</button>
                <button className='buy'>Buy now</button>
                </div>
                </div>))
        }
        </div>
        </>
    )
}
export default Products