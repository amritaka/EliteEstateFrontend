import { useEffect, useState } from 'react'
import Cards from '../../../components/cardcomponent/cardmain.jsx'
import './categorycard.css'
import { Link,  useNavigate } from 'react-router-dom'
import axios from 'axios'



function Allcategory() {
  const [category, seCategory] = useState([])
  const navigate = useNavigate()

  // localStorage.getItem()
  const userDetail = localStorage.getItem("userInfo")
  const authentication = JSON.parse(userDetail)
  // console.log(authentication)

  
  useEffect(() => {
      if (authentication == null) {
          navigate('/login')

      }
  }, [authentication,navigate])

  const imageMap = {
    Residential: '/slidepics/slide3.jpg',
    Commercial: '/slidepics/slide5.jpg',
    Industrial: '/slidepics/slide7.jpg',
    Agricultural: '/slidepics/slide2.jpg',
};

  useEffect(() => {

    const fetchCategories = async () => {
      try {
        
        const Response = await axios.get('https://eliteestatebackend.onrender.com/read')
        console.log(Response)
        seCategory(Response.data)

      } catch (error) {
        console.error('Error fetching subcategories', error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <>
      <div className="Categorybox">
       
        {
          category.map((da)=>(
            <Link className="cardcategory" to={`/subCategory/${da._id}`} key={da._id} style={{ textDecoration: 'none'}}>
            <div style={{ cursor: 'pointer' ,width:"300px"}}>
            <Cards img={imageMap[da.categoryName]} heading={da.categoryName}  upd={'Update'} del={'Delete'}/>
            </div>
            </Link>
          ))
        }
       

      </div>
    </>
  )
}

export default Allcategory






