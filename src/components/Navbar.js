import {Link} from 'react-router-dom'
import { FaHome } from 'react-icons/fa'


const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="links">
            <Link to="/">
                <FaHome  /> 
            </Link>
            </div>
        </nav>
        );
}

export default Navbar