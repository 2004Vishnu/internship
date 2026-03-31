import './Products.css'
function Products(){
    const Products=[
        {
            id:1,
            name:"chair",
            price:300,
            img:"src/assets/chair.webp",
            ratings:4.1
        },
        {
            id:2,
            name:"AC",
            price:9000,
            img:"src/assets/chair.webp",
            ratings:4.5
        },
        {
            id:3,
            name:"Table",
            price:30000,
            img:"src/assets/chair.webp",
            ratings:4.0
        },
        {
            id:4,
            name:"Laptop",
            price:70000,
            img:"src/assets/chair.webp",
            ratings:3.9
        }

    ]
    return(
        <>
        <div className='p1'>
        {
            Products.map((prod)=> (
                <div key={(prod.id)} className='prodcard'>
                <img src={prod.img}></img>
                <h1>{prod.name}</h1>
                <p className='amt'>₹{prod.price} <span className='star'>⭐{prod.ratings}</span></p>
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