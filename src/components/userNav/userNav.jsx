import { NavLink, useNavigate } from 'react-router-dom';
import './userNav.css';
import { useContext } from "react";
import AuthContext from "../../context/authContext.jsx"; 

function UserNav() {
  const { auth, logout } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/login');
  };

  return (
    <>
      <div className="usernav">
        <div className="userlogobox">
          <img src={"/image/eliteLogo.png"} alt="Elite Logo" height={"120px"} width={"200px"} />
        </div>

        {/* Navbar part */}
        <div className="usernavbox">
          <nav className="navbar navbar-expand-lg userinsidenav">
            <div className="container-fluid">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav w-100 d-flex justify-content-center">
                  <NavLink to='/' className="nav-link">Home</NavLink>
                  {auth != null && <NavLink to='/profile' className="nav-link">Profile</NavLink>}
                  <NavLink to='/sellList' className="nav-link">Buy</NavLink>
                  <NavLink to='/rentList' className="nav-link">Rent</NavLink>
                  <NavLink to='/sell' className="nav-link">Sell</NavLink>
                  <NavLink to='/listing' className="nav-link">Listing</NavLink>
                </div>
              </div>
            </div>
          </nav>
        </div>
        {/* Navbar part end */}

        <div className="userbtnbox">
          {/* If the user is logged in, show "Logout", otherwise show "Sign Up" and "Sign In" */}
          {auth ? (
            <button className="btn btn-warning rounded-5 mx-3" id='usernavbtn' onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <button type="button" className="btn btn-warning rounded-5" id='usernavbtn'>
                <NavLink to='/register' style={{ textDecoration: 'none', color: '#fff' }}>Sign Up</NavLink>
              </button>
              <button type="button" className="btn btn-warning rounded-5 mx-3" id='usernavbtn'>
                <NavLink to='/login' style={{ textDecoration: 'none', color: '#fff' }}>Sign In</NavLink>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default UserNav;
