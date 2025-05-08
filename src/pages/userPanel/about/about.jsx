import MyTitle from '../../../components/Title/Title'
import './about.css'
import DoneIcon from '@mui/icons-material/Done';

function AboutUser() {
    return (
        <>
            <div className="aboutbox">
                <div className='aboutimg'>

                </div>
                <div className='abouttxt'>
                    {/* <h2>About Us</h2> */}
                    <h5 class="sml">WHO WE ARE</h5>
                    <h1 class="big">The experts in local and international property</h1>
                    <p class="p">We have over 15 year experience, Over 20,000 people work for us in more than 70 countries all over the world. Learn more about our work! Lorem ipsum vive dolor sit amet.</p>

                    <p class="p">Viverra feugiat. Pellen tesque libero ut justo, ultrices in ligula. Semper at tempufddfel lorem ipsum.</p>
                    <ul className="li">
                            <li> <DoneIcon /> Outstanding property</li>
                            <li><DoneIcon/>Social responsibility</li>
                            <li><DoneIcon/>Get expert advice</li>
                            <li><DoneIcon/>Group structure</li>
                            <li><DoneIcon/>Specialist services</li>
                            <li><DoneIcon/>Vision & strategy</li>
                        </ul>
                </div>
            </div>
        </>
    )
}
export default AboutUser