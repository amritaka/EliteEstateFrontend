// function MyTitle(props) {
function MyTitle({Heading}) {
    return (
        <>

            {/* <h2 style={{
                color:"red"
            }}>{props.Heading}</h2> */}
            <h2 style={{
                color: "orange"
            }}>{Heading}</h2>
        </>
    )
}

export default MyTitle