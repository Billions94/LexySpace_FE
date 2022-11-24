import { Row, Col } from "react-bootstrap";
import Footer from "../footer/Footer";
import "./styles.scss"

const BeforeLogin = () => {
  return (
    <div className='customBG'>
      <Row className='justify-content-center mt-5'>
          <div className='mb-3 text-center welcome'>welcome to LexySpace</div>
          <Col className='customCOL1' xs={3} sm={3} md={3}>
          </Col>
          <Col className='customCOL2' xs={3} sm={3} md={3}>
          </Col>
          <Col className='customCOL3' xs={3} sm={3} md={3}>
          </Col>
          <Col className='customCOL4' xs={3} sm={3} md={3}>
          </Col>  
      </Row>
      <Footer />
    </div>
  );
};

export default BeforeLogin;
