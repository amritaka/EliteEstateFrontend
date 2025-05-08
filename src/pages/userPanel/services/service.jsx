import './service.css'
import { IoHome } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { GiSpookyHouse } from "react-icons/gi";
import MyTitle from '../../../components/Title/Title';
import { Link } from 'react-router-dom';
import { FaLongArrowAltRight } from "react-icons/fa";


function Service(){
    return(
        <>
        <div className='servicediv'>
            <div className='buydiv'>
            <IoHome fontSize={"4vw"} color='orange' />
            <h2 className='buy'>Buy Property</h2>
            {/* <MyTitle Heading={'Buy Home'}/> */}
            <p className="pp">Vivamus a ligula quam. Ut blandit eu leo  Duis sed<br/> dolor amet ipsum primis in faucibus orci.<br/> Lorem ipsum dolor sit amet.</p>
            <Link to={'/sellList'} className='readmore'>Read More<FaLongArrowAltRight  color='orange' /></Link>
            </div>
            <div className='buydiv'>
            <IoHomeOutline fontSize={"4vw"} color='orange' />
            {/* <MyTitle Heading={'Rent Home'}/> */}
            <h2 className='buy'>Rent Property</h2>
            <p className='pp'>Vivamus a ligula quam. Ut blandit eu leo non. <br/>Duis sed dolor amet ipsum primis in faucibus orci. <br/>Lorem ipsum dolor sit amet.</p>
            <Link to={'/rentList'} className='readmore'>Read More<FaLongArrowAltRight  color='orange' /></Link>            </div>
            <div className='buydiv'>
            <IoHome fontSize={"4vw"} color='orange' />
            {/* <MyTitle Heading={'See Neighbourhood'} /> */}
            <h2 className='buy'>Sell Property</h2>
            <p className='pp'>Vivamus a ligula quam. Ut blandit eu leo non. <br/>Duis sed dolor amet ipsum primis in faucibus orci. <br/>Lorem ipsum dolor sit amet.</p>
            <Link to={'/sell'} className='readmore'>Read More<FaLongArrowAltRight  color='orange' /></Link>
            </div>
        </div>
        </>
    )
}
export default Service