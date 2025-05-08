import axios from "axios";
import { useEffect, useState } from "react";
import './history.css'; // Ensure to create this CSS file
import { Link } from "react-router-dom";

function History() {
    const userDetail = localStorage.getItem("userInfo");
    const authentication = JSON.parse(userDetail);
    const [property, setProperty] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("https://eliteestatebackend.onrender.com/showUserBid", {
                    headers: {
                        Authorization: `Bearer ${authentication.token}`
                    }
                });
                console.log(response.data)
                setProperty(response.data);
            } catch (error) {
                console.error("Error fetching bid history", error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="history-container">
            {property.length === 0 ? (
                <p className="text-muted">No Buyers yet.</p>
            ) : (
                <div className="row">
                    {property.map((item) => (
                        <div className="col-md-4 mb-4" key={item._id}>
                            <div className="history-card">
                            <Link to={`/single/${item?.propertyId?._id}`} style={{textDecorationColor:'none'}}>     <img
                                    src={item?.propertyId?.image}
                                    alt="Property"
                                    className="history-image"
                                />
                                <div className="history-content">
                                    <p className="history-label">
                                        <strong>Amount Offered:</strong> ₹{item?.amountBid}
                                    </p>
                                    <p>
                                        <strong>Property:</strong> {item?.propertyId?.propertyName}
                                    </p>
                                    <p>
                                        <strong>Status:</strong> {item?.propertyId?.status}
                                    </p>
                                    <p>
                                        <strong>Price:</strong> ₹{item?.propertyId?.price}
                                    </p>
                                </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default History;
