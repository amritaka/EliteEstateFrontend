import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./property.css";
import { ThreeCircles } from 'react-loader-spinner'

const Property = ({ fetchProperties,he,wi }) => {
  const [formData, setFormData] = useState({
    categoryId: "",
    subCategoryName: "",
    propertyName: "",
    description: "",
    area: "",
    state: "",
    city: "",
    price: "",
    listingType: ""
  });
  const [loading ,setLoding] = useState(false)
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // To store the image preview URL
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const tokenData = localStorage.getItem("userInfo");
  const authentication = JSON.parse(tokenData);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://eliteestatebackend.onrender.com/read")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    if (formData.categoryId) {
      axios
        .get(`https://eliteestatebackend.onrender.com/categories/${formData.categoryId}/subcategories`, {
          headers: { Authorization: `Bearer ${authentication?.token}` },
        })
        .then((response) => setSubcategories(response.data))
        .catch((error) => console.error("Error fetching subcategories:", error));
    } else {
      setSubcategories([]);
    }
  }, [formData.categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Create a URL for the selected image to show the preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleSubmit = async (e) => {
     e.preventDefault();
    setLoding(true)

    const data = new FormData();
    data.append("subCategoryName", formData.subCategoryName);
    data.append("propertyName", formData.propertyName);
    data.append("description", formData.description);
    data.append("area", formData.area);
    data.append("state", formData.state);
    data.append("city", formData.city)
    data.append("image", image);
    data.append("price", formData.price);
    data.append("listingType", formData.listingType)

    try {
      const token = authentication?.token;

      await axios.post("https://eliteestatebackend.onrender.com/propertyCreate", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Property added successfully!");
      setFormData({
        categoryId: "",
        subCategoryName: "",
        propertyName: "",
        description: "",
        area: "",
        state: "",
        city: "",
        price: "",
        listingType: ""
      });
      setImage(null);
      fetchProperties()
      setImagePreview(null); // Clear image preview after submission
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      toast.error(`Error: ${errorMessage}`);
    } finally{
      setLoding(false)
    }
  };

  return (
    <div className="container-fluid  prop">
    <form className="propertyform" onSubmit={handleSubmit} style={{height:he,width:wi}}>
      <div className="headDiv">
        <h1>Sell Property</h1>
      </div>

      {/* Category Dropdown */}
      <div className="myDiv">
        <select
          className="RegSelect"
          id="category"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Dropdown */}
      <div className="myDiv">
        <select
          className="RegSelect"
          id="subcategory"
          name="subCategoryName"
          value={formData.subCategoryName}
          onChange={handleChange}
          required
        >
          <option value="">Select a subcategory</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.subCategoryName}>
              {subcategory.subCategoryName}
            </option>
          ))}
        </select>
      </div>

      {/* Property Name */}
      <div className="myDiv">
        <input
          className="reginput"
          type="text"
          id="name"
          name="propertyName"
          value={formData.propertyName}
          onChange={handleChange}
          placeholder="Property Name"
          required
        />
      </div>

      {/* Description */}
      <div className="myDiv">
        <input
          className="reginput"
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
      </div>

      {/* Area */}
      <div className="myDiv">
        <input
          className="reginput"
          type="text"
          id="area"
          name="area"
          value={formData.area}
          onChange={handleChange}
          placeholder="Area"
          required
        />
      </div>


      <div className="myDiv">
        <input
          className="reginput"
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State"
          required
        />
      </div>


      <div className="myDiv">
        <input
          className="reginput"
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
        />
      </div>

      {/* Price */}
      <div className="myDiv">
        <input
          className="reginput"
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
      </div>

      <div className="myDiv">
        <select
          className='reginput'
          name="listingType"
          value={formData.listingType}
          onChange={handleChange}
        >
          <option value="">Please Select Listing Type</option>
          <option value="Rent">Rent</option>
          <option value="Sell">Sell</option>
        
        </select>
      </div>

      {/* Image */}
      <div className="myDiv">
        <input
          placeholder="Upload Property Image"
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
          required
        />
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="Image Preview" width="100" height="100" />
        </div>
      )}

      {
        loading ?( <ThreeCircles
        visible={true}
        height="50"
        width="50"
        color="orange"
        ariaLabel="three-circles-loading"
        wrapperStyle={{display:"flex",justifyContent:"center"}}
        wrapperClass=""
        
        />) :
        (<button className="regBtn">
        <span>Submit</span>
      </button>)
      }
      <ToastContainer />
    </form>
    </div>  
  );
};

export default Property;
