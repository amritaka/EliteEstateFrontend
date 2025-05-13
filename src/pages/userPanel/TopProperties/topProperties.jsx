import axios from "axios";
import { useEffect, useState } from "react";
import Cards from "../../../components/cardcomponent/cardmain";
import './topProperties.css';
import { Link, useNavigate } from "react-router-dom";

function TopProperties() {
    const [category, setCategory] = useState([]);

    const imageMap = {
        Residential: '/slidepics/slide3.jpg',
        Commercial: '/slidepics/slide5.jpg',
        Industrial: '/slidepics/slide7.jpg',
        Agricultural: '/slidepics/slide2.jpg',
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://eliteestatebackend.onrender.com/read');
                console.log(response);
                setCategory(response.data);
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="TopPropertyContainer">
            <div className='TopPropertyheadingbox'>
                <h1>Top Properties</h1>
            </div>
            <div className='Topcardbox'>
                {category.map((da) => (
                    <Link className="cardproperty" to={`/subCategory/${da._id}`} key={da._id} style={{textDecoration: 'none',color:'orange'}}>
                        <div  style={{ cursor: 'pointer' ,width:"300px"}}>
                            <Cards img={imageMap[da.categoryName]} heading={da.categoryName} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default TopProperties;
