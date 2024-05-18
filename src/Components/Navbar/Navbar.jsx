import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../AuthContext/AuthContext'
import { CartContext } from '../AuthContext/CartContext'

export default function Navbar() {

  const {NumOfCartItems }= useContext(CartContext)


  const {mytoken , setToken} = useContext(authContext)

  const navigate= useNavigate()

  function NavigateCart(){
    navigate("/cart")
  }

  function Logout (){
    setToken(null);
    localStorage.removeItem('tkn');
    navigate("/login")
  }

  return <>

  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand logo_nav d-flex" to="/"  ><ul><li className=' fa-solid icon_nav fa-cart-shopping nav-icon'> </li> </ul> fresh cart </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      {mytoken? <ul className="navbar-nav m-auto mb-2 mb-lg-0">

  <li className="nav-item">
    <Link className="nav-link active" aria-current="page" to="/home" >Home</Link>
  </li>

  <li className="nav-item position-relative">
    <Link className="nav-link" to="/cart" > cart</Link>
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-2 bg-success">
      {NumOfCartItems?NumOfCartItems:"" }
    </span>
  </li>

  <li className="nav-item">
    <Link className="nav-link" to="/Wishlist" > wish list</Link>
  </li>

  <li className="nav-item">
    <Link className="nav-link"  to="/Products" > Products</Link>
  </li>

  <li className="nav-item">
    <Link className="nav-link" to="/Catrgories" > catrgories</Link>
  </li>

  <li className="nav-item">
    <Link className="nav-link" to="/Brands" > brands</Link>
  </li>

  <li className="nav-item">
    <Link className="nav-link" to="/AllOrders" > All Orders</Link>
  </li>

  </ul>:""}


      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
        

        {mytoken?<li className="nav-item">
          <ul className='list-unstyled d-flex'>

            <li className="nav-item me-3 position-relative">

              <li role='button' onClick={NavigateCart} className='me-2 fa-solid icon_nav icon_Cart fa-cart-shopping nav-icon'> </li>
    
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-2 bg-success">
                {NumOfCartItems?NumOfCartItems:"" }
              </span>
            </li>
            
            <li>
              <i className='me-2 fa-brands fa-instagram' ></i>
            </li>
            <li>
              <i className='me-2 fa-brands fa-facebook'></i>
            </li>
            <li>
              <i className='me-2 fa-brands fa-linkedin'></i>
            </li>
            
          </ul>
        </li>:""}


        
       
        { mytoken? <li className="nav-item">
          <span role='button' onClick={Logout} className="nav-link" > log out </span>
        </li>: <>
        
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/register" >register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login" > Login </Link>
          </li>
          
        </> }
        
      </ul>



    </div>
  </div>
</nav>
  
  
  </>
}
