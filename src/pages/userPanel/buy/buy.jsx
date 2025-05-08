import { useContext, useEffect, useState } from 'react'
import './buy.css'
import axios from 'axios'
import Cards from '../../../components/cardcomponent/cardmain'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../../context/authContext'

function Buylisting() {
    const [data, setData] = useState([])
    const [subcategories, setSubcategories] = useState([]);
    const [selectSubCategory, setselectSubCategory] = useState("")

    useEffect(() => {
        async function fetchList() {
            const response = await axios.get("https://eliteestatebackend.onrender.com/sellData")
            setData(response.data)
        }
        fetchList()
    }, [])

    useEffect(() => {
        axios
            .get("https://eliteestatebackend.onrender.com/subcategory")
            .then((response) => {
                setSubcategories(response.data)
            })
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

    // Filter data to exclude "Sold" and "Reject" properties
    const filteredData = selectSubCategory
        ? data.filter((property) => 
            property.subCategoryId === selectSubCategory &&
        property.approved === "Approved" && 
            property.status !== "Sold"
        )
        : data.filter((property) => 
            property.approved === "Approved"&& 
            property.status !== "Sold"
        );
    
    console.log(filteredData) // To see the filtered data in the console

    const navigate = useNavigate()

    const { token } = useContext(AuthContext)

    useEffect(() => {
        if (token === null) {
            navigate('/login')
        }
    }, [token, navigate])

    return (
        <>
            <select
                className='options-prop'
                value={selectSubCategory}
                onChange={(e) => setselectSubCategory(e.target.value)}
            >
                <option value="">Select Option</option>
                {
                    subcategories.map((data) => (
                        <option key={data._id} value={data._id}>{data.subCategoryName}</option>
                    ))
                }
            </select>
            
            <div className='listbox'>
                {
                    filteredData.map((value) => (
                        <Link
                            className="cardproperty"
                            to={`/single/${value._id}`}
                            key={value._id}
                            style={{ textDecoration: 'none' }}
                        >
                            <div
                                className='listCard'
                                style={{
                                    cursor: 'pointer',
                                    width: "300px"
                                }}
                            >
                                <Cards img={value.image} heading={value.propertyName} />
                            </div>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}

export default Buylisting
