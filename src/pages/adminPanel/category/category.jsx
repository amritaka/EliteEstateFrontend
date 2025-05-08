import React, { useEffect, useState } from 'react'
import './category.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from '../../../components/adminNav/navbar'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryAdd = () => {
    const [categoryName, setCategoryName] = useState('Commercial');

    const handleChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://eliteestatebackend.onrender.com/create', { categoryName });
            //console.log(response)
            toast.success('Category Add Successful');
            setCategoryName('Commercial');
            // navigate('/subcategory'); 
        } catch (error) {
            //console.log(error)
            toast.error(error.response.data);
        }
    };
     const navigate = useNavigate()
    
        // localStorage.getItem()
        const userDetail = localStorage.getItem("userInfo")
        const authentication = JSON.parse(userDetail)
        console.log(authentication)

        useEffect(() => {
            if (authentication == null) {
                navigate('/login')
    
            }else if(authentication.authtype !== "Admin"){
                navigate('/login')
            }
        }, [])
    return (
        <>
            {/* <Nav /> */}
            <div className='categorybox'>
                <div className='categoryimgbox'>
                    <h3 className='catH3'>Add Category</h3>
                    <img src={"public/image/categoryform.jpg"} alt="" srcset="" height={"250px"} width={"400"} />

                </div>
                <div className='categoryformbox'>
                    <form onSubmit={handleSubmit} className='categoryForm'>

                        <h1 className='catH1'>Add Category</h1>
                        <label htmlFor="categoryName" className='catLabel'>Category Name
                            <select
                                className='catSelect'
                                name="categoryName"
                                value={categoryName}
                                onChange={handleChange}
                            >

                                <option value="Commercial">Commercial</option>
                                <option value="Residential">Residential</option>
                                <option value="Industrial">Industrial</option>
                                <option value="Agricultural">Agricultural</option>
                            </select></label>
                        <button className='catButton'>Submit</button>
                        <Link to={'/subcategory'}>Click here to add subcategory</Link>
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
export default CategoryAdd