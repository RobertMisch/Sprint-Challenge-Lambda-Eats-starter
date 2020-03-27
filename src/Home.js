import React from "react";
import { Link } from "react-router-dom";

function Home(){
    return(
        <div>
            <h1>Throw away home screen, click the pizza button</h1>
            <Link to={'/pizza'} ><div className="form-button">Pizza</div></Link>
        </div>
    )
}

export default Home;