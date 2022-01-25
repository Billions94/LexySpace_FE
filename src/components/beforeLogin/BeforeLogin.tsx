import { Row, Col } from "react-bootstrap";
import Footer from "../footer/Footer";
import "./styles.scss"

const BeforeLogin = () => {
  return (
    <div className='customBG mt-4'>
      <Row className='justify-content-center'>
          <Col className='mt-5 customCOL1' xs={3} sm={3} md={3}>
          </Col>
          <Col className='mt-5 customCOL2' xs={3} sm={3} md={3}>
          </Col>
          <Col className='mt-5 customCOL3' xs={3} sm={3} md={3}>
          </Col>
          <Col className='mt-5 customCOL4' xs={3} sm={3} md={3}>
          </Col>  
      </Row>
    </div>
  );
};

export default BeforeLogin;
