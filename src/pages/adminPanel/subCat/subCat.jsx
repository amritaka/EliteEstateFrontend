import { data, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './subCat.css'
import { Link, useNavigate } from "react-router-dom";
import Cards from "../../../components/cardcomponent/cardmain";

function SubCategoryPage() {
    const { id } = useParams();
    const [subCategoryData, setSubCategoryData] = useState([]);
    const imageMaps = {
        Houses: '/slidepics/slide3.jpg',
        Flats: '/slidepics/slide7.jpg',
        Shops: '/slidepics/shops.jpg',
        Offices: '/slidepics/slide4.jpg',
        Plots: '/slidepics/plot.jpg',
        Hotels: '/slidepics/slide8.jpg',
        Factories: '/slidepics/factory.jpg',
        Warehouses: '/slidepics/warehouse.jpg',
        Restaurants: '/slidepics/slide5.jpg',
        Resorts: '/slidepics/slide6.jpg',
        Farmlands: '/slidepics/slide2.jpg',
        
    
    };

    const navigate = useNavigate()

    // localStorage.getItem()
    const userDetail = localStorage.getItem("userInfo")
    const authentication = JSON.parse(userDetail)
    // console.log(authentication)
    useEffect(() => {
        if (authentication == null) {
            navigate('/login')

        }
    }, [])


    useEffect(() => {
        const fetchSubCategoryData = async () => {
            try {
                const Response = await axios.get(`https://eliteestatebackend.onrender.com/categories/${id}`,{
                    headers:{
                        Authorization:`Bearer ${authentication.token}`
                    }
                })
                console.log(Response)
                setSubCategoryData(Response.data);
            } catch (error) {
                console.error("Error fetching subcategory data", error);
            }
        };
        fetchSubCategoryData();
    }, [id]);

    return (
        <div className="SubCateMain">
            <h1 className="SubCath1">Subcategory Details</h1>

            <div className='subCatbox' style={{ width: "100%" }}>
                {
                    subCategoryData.map((data) => (
                        <Link className="cardproperty" to={`/property/${data._id}`} key={data._id} style={{ textDecoration: 'none' }}>
                            <div style={{ cursor: 'pointer', width: "300px" }}>

                                <Cards img={imageMaps[data.subCategoryName]} heading={data.subCategoryName} />
                            </div>
                        </Link>
                    ))
                }
            </div>

        </div>
    );
}

export default SubCategoryPage;
