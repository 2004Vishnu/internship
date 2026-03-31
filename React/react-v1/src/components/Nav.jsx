import './nav.css'
import { Link } from 'react-router'
function Nav(){
    return(
        
            <nav className='nav'>
                <div className='logo'>Riders</div>
                <ul className='l'>
                    <li><Link to="/" >Home</Link></li>
                    <li><Link to="/service" >services</Link></li>
                    <li><Link to="/about" >About us</Link></li>
                    <li><Link to="/contact" >Contact us</Link></li>
                    <li><Link to="/product" >products</Link></li>
                </ul>
            </nav>
    
    )
}
export default Nav