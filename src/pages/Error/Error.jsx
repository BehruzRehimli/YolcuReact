import React from 'react'
import "./Error.css"
import { Link } from 'react-router-dom'
import {GrCircleInformation} from "react-icons/gr"

const Error = () => {
    return (
        <div id="page-content-container mt-5">
            <div className="error-page-wrapper mt-5 ">
                <p className="text-404">404</p>
                <div className="content-404"><p>
                    <span>Page not found!</span>
                    <span><Link to={"/"}>Click</Link> to go home page.</span>
                </p><GrCircleInformation style={{color:"#2169aa",opacity:"0.11",fontSize:"110px"}}/>
                </div>
            </div>
        </div>
    )
}

export default Error