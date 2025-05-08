import './contact.css'
import { MdOutlineContactPhone } from "react-icons/md";
import { SiImessage } from "react-icons/si";
import { FaLongArrowAltRight } from "react-icons/fa";

function ContactUs() {
    return (
        <>
            <div className='contactdiv'>
                <div className="contactboxlogo" >
                    <img src={'/image/eliteLogo.png'} alt="" srcset="" width={300} />
                </div>
                <div className='contactbox1'>
                    <MdOutlineContactPhone fontSize={"3vw"} color='orange' />
                    <h4 className='free'>FREE CONSULTATION</h4>
                    <h5>Schedule a free consultation with our specialist.</h5>
                    <h5>Email:
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=amritgill05139@gmail.com"
                            target="_blank" style={{
                                textDecoration:"none",
                                color:'black'
                            }}>
                            amritgill05139@gmail.com
                        </a>
                    </h5>

                </div>
                <div className='contactbox'> <SiImessage fontSize={"3vw"} color='orange' />
                    <h4 className='free'>HELP DESK</h4>
                    <h5> Call Now on this number for more information.</h5>
                    <h6>+91 76767688876</h6>
                </div>

            </div>
        </>
    )
}
export default ContactUs