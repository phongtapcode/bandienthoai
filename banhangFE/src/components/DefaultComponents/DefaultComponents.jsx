import Header from "../Header/Header";

function DefaultComponent({children}){
    return(
        <>
            <Header/>
            {children}
        </>
    )
}

export default DefaultComponent;