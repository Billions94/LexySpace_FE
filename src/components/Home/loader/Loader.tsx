import React from 'react'
import Col from "react-bootstrap/Col"
import Spinner from "react-bootstrap/Spinner"
import "./styles.scss"

const Loader = () => {
    return (
        <Col className="text-center mt-5">
            <Spinner animation="grow"/>
        </Col>
    )
}


export default Loader