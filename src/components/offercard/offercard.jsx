import "./offercard.css"

function OfferCard(){
    return(
        <>
      <div className="container   mt-5 " id="cc">
        <div className="row  ">
         <div className="col-md-4 border border-black" id="ff">
          <div className="txt-form">
           <img src={"public/image/categoryform.jpg"} alt="" srcset="" height={"200px"} width={"390"} id="img"/>
           <small className="fw-bold">Rs 710.68.....</small>
           <h5 className="fw-bold offercut">Rs 710.68.....</h5>
           <h4 className="fw-bold">COVA Home Realty</h4>
           <div className="adr">
            1901 Thornindge Cir ,Shiloh Hawali 81063
           </div>
           <div className="txt1-form  d-flex  gap-3">
            <no className="no ">1844</no>
            <no className="no">2344</no>
            <no className="no">3444</no>
           </div>
           
          </div>
         </div>
        </div>
      </div>
        </>
    )
}
export default OfferCard