import React from 'react'
import Col from "react-bootstrap/Col"
import Spinner from "react-bootstrap/Spinner"
import "./styles.scss"

const Loader = () => {
    return (
        <div className='spinner-container'>
            <Spinner  className="spinner" animation="grow"/>
        </div>
    )
}


export default Loader