import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {

  const [cartView, setcartView] = useState(false);
  const navigate = useNavigate();

  let data = useCart();

  const handleLogout =()=>{
    localStorage.removeItem("authToken");
    navigate('/login');
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2 fst-italic" to="#">FoodOrder</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto">
              <Link className="nav-link active fs-5" aria-current="page" to="#">Home</Link>
              {localStorage.getItem("authToken") && ( // Check if user is authenticated
                <Link className="nav-link active fs-5" aria-current="page" to="#">My Orders</Link>
              )}
            </div>
            {(!localStorage.getItem("authToken")) 
            ? 
            ( // Check if user is authenticated
              <div className='d-flex'>
                <Link className="btn bg-white text-info mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-info mx-1" to="/signup">SignUp</Link>
              </div>
            )
             : 
            (<div>
                <div className='btn bg-white text-info mx-1' onClick={()=>{setcartView(true)}}>
                  MyCart
                  <Badge className='mx-2' pill bg="danger">{data.length}</Badge>
                </div>
                {cartView ? <Modal onClose={()=>{setcartView(false)}}><Cart/></Modal> : null}
                <div className='btn bg-white text-primary mx-1' onClick={handleLogout}>
                  Logout
                </div>
            </div>
            )
             }
          </div>
        </div>
      </nav>
    </div>
  );
}
