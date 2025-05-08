import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import Cards from "../../../components/cardcomponent/cardmain";
import './showProp.css'
import Cards from "../../../components/cardcomponent/cardmain";

function PropertyPage() {
    const { id } = useParams();
    const [propetyData, setPropertyData] = useState([]);


    useEffect(() => {
        const fetchSubCategoryData = async () => {
            try {
                const response = await axios.get(`https://eliteestatebackend.onrender.com/subcatgories/${id}`);
                console.log(response)
                setPropertyData(response.data);
            } catch (error) {
                console.error("Error fetching subcategory data", error);
            }
        };
        fetchSubCategoryData();
    }, [id]);

    return (
        <div className="SubCateMain">
            <h1 className="SubCath1">Property Details</h1>

            <div className='subCatbox' style={{ width: "100%" }}>
                {
                    propetyData.map((data) => (
                        <Link className="cardproperty" to={`/single/${data._id}`} key={data._id} style={{ textDecoration: 'none' }}>
                            <div style={{ cursor: 'pointer', width: "300px" }}>
                                <Cards img={data.image} heading={data.propertyName} para={data.description} />
                            </div>
                        </Link>
                    ))
                }
            </div>

        </div>
    );
}

export default PropertyPage;
