// import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from "./pages/forms/login/login.jsx"
import Register from './pages/forms/register/register.jsx'
// import Nav from './components/adminNav/navbar.jsx'
import Heropage from './pages/adminPanel/adminhero/hero.jsx'
import CategoryAdd from './pages/adminPanel/category/category.jsx'
import SubcategoryAdd from './pages/adminPanel/subcategory/subcategory.jsx'

import UserHero from './pages/userPanel/userHero/userhero.jsx'
import { useContext } from 'react'
import Nav from './components/adminNav/navbar.jsx'
// import UserNav from './pages/userPanel/userNav/userNav.jsx'
import AuthContext from "./context/authContext.jsx";
import UserNav from './components/userNav/userNav.jsx'
import Allcategory from './pages/adminPanel/categorycard/categorycard.jsx'
import Property from './pages/userPanel/property/property.jsx'
import SubCategoryPage from './pages/adminPanel/subCat/subCat.jsx'
import PropertyPage from './pages/adminPanel/showPropeties/showProp.jsx'
import Profile from './pages/userPanel/profile/profile.jsx'
import Listing from './pages/userPanel/proplisting/proplist.jsx'
import PropertyListing from './components/singleProperty/singleProperty.jsx'
import TopOffer from './pages/userPanel/topoffer/topoffer.jsx'
import Rentlisting from './pages/userPanel/rent/rent.jsx'
import Buylisting from './pages/userPanel/buy/buy.jsx'
import Sell from './pages/userPanel/sell/sell.jsx'
import Applybid from './pages/userPanel/applybid/apply.jsx'
import OfferCard from './components/offercard/offercard.jsx'
import Update from './pages/forms/update/update.jsx'
import Assitant from './ai/myAssiatant.jsx'
import SubcategoryTable from './pages/adminPanel/tables/subcategoryDetail/subcategoryTab.jsx'
import CategoryTable from './pages/adminPanel/tables/categoryTable/editCat.jsx'
import UserTable from './pages/adminPanel/tables/userdetail/usertable.jsx'
import PropertyTable from './pages/adminPanel/tables/propertyDetail/tableProperty.jsx'
import History from './pages/userPanel/history/history.jsx'




function App() {

  // const [auth, setAuth] = useState('Seller')
  const { auth } = useContext(AuthContext)

  console.log(auth)
  // useEffect(() => {
  //   const userDetail = localStorage.getItem("userInfo")
  //   if (userDetail) {
  //     const authentication = JSON.parse(userDetail)
  //     // console.log(authetication.authtype)
  //     setAuth(authentication.authtype)
  //   }
  // }, [])

  return (
    <>

      {
        auth === "Admin" ? <Nav /> : <UserNav />
      }
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/category' element={<CategoryAdd />} />
        <Route path='/history' element={<History />} />
        <Route path='/showcategory' element={<Allcategory />} />
        <Route path='/subcategoryAdd' element={<SubcategoryAdd />} />
        <Route path='/hero' element={<Heropage />} />
        <Route path='/showProperty' element={<PropertyTable/>} />

        <Route path='/' element={<UserHero />} />
        <Route path='/addProperty' element={<Property />} />
        {/* Dynamic Route for Subcategory */}
        <Route path='/subCategory/:id' element={<SubCategoryPage />} />
        <Route path='/property/:id' element={<PropertyPage />} />
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/listing' element={<Listing/>}></Route>
        <Route path='/single/:id' element={<PropertyListing/>}></Route>
        <Route path='/editCat' element={<CategoryTable/>}></Route>
        <Route path='/subTab' element={<SubcategoryTable/>}></Route>
        <Route path='/topOffer' element={<TopOffer/>}></Route>
        <Route path='/rentList' element={<Rentlisting/>}></Route>
        <Route path='/sellList' element={<Buylisting/>}></Route>
        <Route path='/sell' element={<Sell/>}></Route>
        <Route path='/apply/:id' element={<Applybid/>}></Route>
        <Route path='/offer' element={<OfferCard/>}></Route>
        <Route path='/Assitant' element={<Assitant/>}></Route>
        <Route path='/update/:id' element={<Update/>}></Route>
        <Route path='/usertab' element={<UserTable/>}></Route>
      </Routes>

    </>
  )
}

export default App
