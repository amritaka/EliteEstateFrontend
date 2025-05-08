import { Link, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import AuthContext from "../../context/authContext.jsx"; 

function Nav() {
  const { auth, logout } = useContext(AuthContext); 
  console.log(auth,"adminnav")
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <img src={"/image/logo.png"} alt="" height={"80px"} width={"150px"} />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-xl-flex flex-xl-row-reverse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={"/hero"} className="nav-link active" aria-current="page" href="#">Home</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Users
                </Link>
                <ul className="dropdown-menu">
                  <li><Link to={"/usertab"} className="dropdown-item" href="#">Show Users</Link></li>
                </ul>
              </li>
             <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Property
                </Link>
                <ul className="dropdown-menu">
                  <li><Link to={"/showProperty"} className="dropdown-item" href="#">Show Properties</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
                </Link>
                <ul className="dropdown-menu">
                  <li><Link to={"/showcategory"} className="dropdown-item" href="#">Show Categories</Link></li>
                  <li><Link to={"/editCat"} className="dropdown-item" href="#">Edit Categories</Link></li>
                  <li><Link to={"/category"} className="dropdown-item" href="#">Add Category</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sub Category
                </Link>
                <ul className="dropdown-menu">
                  {/* <li><Link to={"/subCategory/:id"} className="dropdown-item" href="#">Show Sub Categories</Link></li> */}
                  <li><Link to={"/subTab"} className="dropdown-item" href="#">Edit Sub Categories</Link></li>
                  <li><Link to={"/subcategoryAdd"} className="dropdown-item" href="#">Add Sub Category</Link></li>
                </ul>
              </li>

              {/* Conditional rendering of Logout button */}
              {auth && (
                <li className="nav-item">
                  <a href="#" className="nav-link" onClick={handleLogout}>Logout</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
