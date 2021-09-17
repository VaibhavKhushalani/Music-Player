import React from "react";
import { Card,Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const MiddleComp = (props) => {
  return (
    <>
      <div className="MiddleComp">
    
      <div className="middle-logo"><h3>Trending Albums</h3></div>
      {/* <div>  <button className="btn-list"><BsMusicNoteList/></button></div> */}
        <Container>
          <Row>
          {props.jsondata.map((data) => {
              return(
            <Col xs={2}>
               
              <Card>
                <Card.Img
                  variant="top"
                  src={data.cover}
                />
                <Card.Body>
                  <Card.Title>{data.name}</Card.Title>
                  <Card.Text>{data.singer}</Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              </Card>
              
            </Col>
          )})}
          </Row>
         
        
         
          
        </Container>
       
   
      </div>
    </>
  );
};

export default MiddleComp;
