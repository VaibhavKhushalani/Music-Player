import React, { useContext } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const MiddleComp = (props) => {
  const whilePlaying = () => {
    props.progressBar.current.value = props.audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    props.animationRef.current = requestAnimationFrame(whilePlaying);
    props.audioPlayer.current.volume = 0.8;
  };
  const changePlayerCurrentTime = () => {
    let totalprogressbar =
      (props.progressBar.current.value / props.duration) * 100;
    props.progressBar.current.style.setProperty(
      "--seek-before-width",
      `${totalprogressbar}%`
    );
    props.setCurrentTime(props.progressBar.current.value);
  };

  const prevValue = props.isPlaying;

  const Playmusic = (e) => {
    if (e.target.id) {
      props.setCurrentIndex(e.target.id);
      props.audioPlayer.current.play();
      props.setAuto(true);
      if (!prevValue) {
        props.setIsPlaying(!prevValue);
        props.animationRef.current = requestAnimationFrame(whilePlaying);
        props.setRotate("rotatePlayer 3s linear infinite");
      }
    }
  };

  return (
    <>
      <div className="MiddleComp">
        <div className="h3-center">
          <h3 className="middle-logo">Trending Albums</h3>
        </div>

        <Container>
          <Row>
            {props.jsondata.slice(0, 102).map((data, id) => {
              return (
                <Col xs={2}>
                  <Card>
                    <Card.Img
                      id={id}
                      onClick={Playmusic}
                      variant="top"
                      src={data.cover}
                    />

                    <Card.Body>
                      <Card.Title>{data.name}</Card.Title>
                      <Card.Text>{data.singer}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MiddleComp;
