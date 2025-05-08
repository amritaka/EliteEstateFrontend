import SliderUser from "../slider/slider.jsx"
import TopProperties from "../TopProperties/topProperties.jsx"
import UserNav from "../../../components/userNav/userNav.jsx"
import AboutUser from "../about/about.jsx"
import ContactUs from "../contactUs/contact.jsx"
import Service from "../services/service.jsx"
import TopOffer from "../topoffer/topoffer.jsx"
import './userHero.css'
import { Link } from "react-router-dom"



function UserHero() {
    return (
        <div className='hero'>

            {/* <UserNav/> */}
            <SliderUser />
            <TopProperties />
            <AboutUser />
            <TopOffer />
            <Service />
            <ContactUs />
            {/* <nav/> */}
            {/* slider tag */}
            {/* topPropertiesTag */}
           <Link to={'/Assitant'}> <div className="assistant" style={{
                width: "100px",
                height: "100px",
                border: "2px solid black",
                borderRadius: "50px",
                position: "fixed",
                zIndex: "10",
                right: "10px",
                bottom: "10px",
                overflow: "hidden", // ensures the gif stays within the circle
                boxShadow:"2px 2px 5px gray"

            }}>
                <img
                    src="/assitant.gif"
                    alt="Assistant"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover" // ensures the gif covers the div nicely
                    }}
                />
            </div>
            </Link>


        </div>
    )
}

export default UserHero