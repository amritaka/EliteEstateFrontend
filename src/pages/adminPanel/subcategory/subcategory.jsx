import React, { useState,useEffect } from 'react'
import '../../adminPanel/category/category.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from '../../../components/adminNav/navbar'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SubcategoryAdd = () => {
    const [subCategoryName, setSubcategoryName] = useState('Plots')
    const [categoryName,setcategoryName]=useState('Commercial')
    const [categoryData,setcategoryData]=useState([])
    
    const handleChange = (e) => {
        const {name,value}=e.target
        if(name==='subCategoryName') {
            setSubcategoryName(value)
   
        }else if (name === 'categoryName'){
            setcategoryName(value)
        }
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const response = await axios.post('https://eliteestatebackend.onrender.com/subcategoryCreate', { 
                subCategoryName,
                categoryName 
            })
            // console.log(response)

            toast.success('SubCategory Added')
            setSubcategoryName('Plots')
            // navigate('/category')
        } catch (error) {
            toast.error(error.response.data)
        }
    }
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

    useEffect(()=>{
        const fetchCategories = async()=> {
            try {
                const token =authentication?.token
                if(token){
                    const catResponse = await axios.get('https://eliteestatebackend.onrender.com/read',{
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setcategoryData(catResponse.data)
                }
            } catch (error) {
                console.error('Error fetching categories',error)
            }
        }
        fetchCategories()
    },[authentication])
    return (
        <>
            {/* <Nav /> */}
            <div className='categorybox'>
                <div className='categoryimgbox'>
                    <h3 className='catH3'>Add Subcategory</h3>
                </div>
                <div className='categoryformbox'>
                    <form onSubmit={handleSubmit} className='categoryForm'>

                        <h1 className='catH1'>Add SubCategory</h1>
                        <label htmlFor="categoryName" className='catLabel'>Category Name
                            <select
                                className='catSelect'
                                name="categoryName"
                                value={categoryName}
                                onChange={handleChange}
                            >
                            {
                                categoryData.map((catData)=>(
                                    <option key={catData._id} value={catData.categoryName}>
                                     {catData.categoryName}
                                    </option>

                                ))
                            }
                                
                            </select></label>
                            <label htmlFor="subCategoryName" className='catLabel'>SubCategory Name
                            <select
                                className='catSelect'
                                name="subCategoryName"
                                value={subCategoryName}
                                onChange={handleChange}
                            >
                                <option value="Plots">Plots</option>
                                <option value="Houses">Houses</option>
                                <option value="Flats">Flats</option>
                                <option value="Shops">Shops</option>
                                <option value="Offices">Offices</option>
                                <option value="Hotels">Hotels</option>
                                <option value="Factories">Factories</option>
                                <option value="Warehouses">Warehouses</option>
                                <option value="Restaurants">Restaurants</option>
                                <option value="Resorts">Resorts</option>
                                <option value="Farmlands">Farmlands</option>
                            </select></label>
                        <button className='catButton'>Submit</button>
                        <Link to={'/category'}>Click here to add category</Link>
                    </form>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </>
    )
}
export default SubcategoryAdd