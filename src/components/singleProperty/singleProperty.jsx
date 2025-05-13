import React, { useContext, useEffect, useState } from "react";
import { FaRulerCombined } from "react-icons/fa";
import "./singlrProperty.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MapComponent from "../GoogleMAp/googleMap";
import AuthContext from "../../context/authContext";
import ProfileContext from "../../context/profileContext";

export default function PropertyListing() {
  const [prop, setProp] = useState({});
  const [Review, setReview] = useState([]);

  const { detail } = useContext(ProfileContext);
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch property details
  const fetchSingleProperty = async (id) => {
    try {
      const response = await axios.get(`https://eliteestatebackend.onrender.com/propertyDetail/${id}`);
      setProp(response.data);
    } catch (error) {
      console.error("Axios Error (Property):", error);
    }
  };

  // Fetch reviews
  const Reviews = async (id) => {
    try {
      const res = await axios.get(`https://eliteestatebackend.onrender.com/fetchSingleProperty/${id}`);
      setReview(res.data);
    } catch (error) {
      console.error("Axios Error (Reviews):", error);
    }
  };

  useEffect(() => {
    fetchSingleProperty(id);
    Reviews(id);
  }, [id]);

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="container">
      {/* Main Content */}
      <main className="content">
        {/* Image Section */}
        <div className="image-section">
          <img src={prop?.image} alt="Property" className="property-image" height={600} width={"100%"} />
          <div className="image-overlay">
            <span><FaRulerCombined /> {prop?.area}</span>
            <span className="price">Rs {prop?.price}</span>
          </div>
        </div>

        {/* Description Section */}
        <section className="description">
          <h2>{prop.propertyName}</h2>
          <p className="location">{prop.city}, {prop.state}</p>
          <p className="text">{prop.description}</p>
        </section>

        {/* Map Section */}
        <section className="map-section">
          <h3>Property Location</h3>
          <MapComponent city={prop?.city} state={prop?.state} />
        </section>

        {/* Agent Section */}
        <section className="agent-section">
          <img src={"/image/profile.jpg"} alt="Agent" className="agent-photo" />
          <div className="agent-info">
            <h3>{prop?.UserId?.userName}</h3>
            <p>Owner</p>
            <p>{prop?.UserId?.email}</p>
            <p>+{prop?.UserId?.mobileno}</p>
            {
              prop.UserId && prop.UserId._id !== detail._id ? (
                <Link to={`/apply/${prop._id}`}>
                  <button className="btn primary">Enter your budget</button>
                </Link>
              ) : null
            }
          </div>
        </section>
      </main>

      {/* Reviews - Only visible to the owner */}
      {
        prop.UserId && prop.UserId._id === detail._id ? (
          <main className="content">
            <div className="myreviwcontainter">
              <h2 style={{ marginBottom: "20px" }}>Offers Received</h2>
              <div className="myReviewcontent">
                {
                  Review.map((d) => (
                    <section className="myReview-section" key={d._id}>
                      <label>
                        <img src={"/image/profile.jpg"} alt="Agent" style={{ borderRadius: "80px" }} width={50} />
                        <h1>{d?.UserId?.userName}</h1>
                      </label>
                      <div className="agent-info">
                        <label>
                          Amount Offered
                          <p>Rs {d?.amountBid}</p>
                        </label>
                         <label>
                          Message
                          <p>Rs {d?.message}</p>
                        </label>
                      </div>
                      <div className="contact">
                        <label>
                          Phone Number
                          <p>+{d?.UserId?.mobileno}</p>
                        </label>
                      </div>
                    </section>
                  ))
                }
              </div>
            </div>
          </main>
        ) : null
      }
    </div>
  );
}
