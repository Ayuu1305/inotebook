import React from "react";
import { Link,useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
let navigate=useNavigate()
  const handlelogout=()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }

  let location = useLocation();
 
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul
            className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
            
          >
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">
                About
              </Link>
            </li>
 
          </ul>  
        {!localStorage.getItem('token') ? <form className="d-flex" role="search">
          <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
          <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
      </form> : <button onClick={handlelogout} className="btn btn-primary">Logout</button>}   
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
