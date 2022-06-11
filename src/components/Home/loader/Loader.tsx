import React from 'react'
import Spinner from "react-bootstrap/Spinner"
import "./styles.scss"

const Loader = () => {
    return (
        <div className='spinner-container'>
            <Spinner  className="spinner" animation="border"/>
        </div>
    )
}


export default Loader