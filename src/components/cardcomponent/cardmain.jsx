import './cardmain.css'

function Cards({img, heading, para}) {
    return(
        <>
        <div className="cardComponentcontain">
            <img src={img} alt="" srcset="" height={'200px'} width={'100%'} className='myCarImg' />
            <h3>{heading}</h3>
            <p>{para}</p>
          
        </div>
        </>
    )
}

export default Cards
