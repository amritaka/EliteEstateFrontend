import { useContext, useEffect, useState } from 'react'
import './proplist.css'
import axios from 'axios'
import Cards from '../../../components/cardcomponent/cardmain'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../../context/authContext'

function Listing() {
    const [data, setData] = useState([])
    const [subcategories, setSubcategories] = useState([]);
    const [selectSubCategory, setselectSubCategory] = useState("")
    const { token } = useContext(AuthContext)
const navigate = useNavigate()
    useEffect(() => {
        if (token === null) {
            navigate('/login')
        }
    }, [token, navigate])

    useEffect(() => {
        async function fetchList() {
            const response = await axios.get("https://eliteestatebackend.onrender.com/getProperty")
            console.log(response.data)
            setData(response.data)
        }
        fetchList()
    }, [])

    useEffect(() => {
        axios
            .get("https://eliteestatebackend.onrender.com/subcategory")
            .then((response) => {
                console.log(response.data)
                setSubcategories(response.data)
            })
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

    const filteredData = selectSubCategory
    ? data.filter((property) => 
        property.subCategoryId._id === selectSubCategory && // Compare the subCategoryId._id
        property.approved === "Approved" && 
        property.status !== "Sold"
    )
    : data.filter((property) => 
        property.approved === "Approved" && 
        property.status !== "Sold"
    );


        console.log(selectSubCategory)

    return (
        <>  
        <h5 className='sort'>Sort by</h5>
            <select className='options-prop'
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

export default Listing
