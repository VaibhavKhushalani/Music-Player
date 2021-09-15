import React, {useEffect } from "react";
import { FiShuffle } from "react-icons/fi";
import {
  IoPlaySkipForward,
  IoPlayForward,
  IoPause,
  IoPlay,
  IoPlaySkipBack,
  IoPlayBack,
} from "react-icons/io5";
import { MdRepeat } from "react-icons/md";
import { RiPlayListFill } from "react-icons/ri";
import { HiVolumeUp } from "react-icons/hi";

const Control = (props) => {


  useEffect(() => {
    const seconds = Math.floor(props.audioPlayer.current.duration);
    props.setDuration(seconds);
    props.progressBar.current.max = seconds;
  }, [props.audioPlayer?.current?.loadedmetadata, props.audioPlayer?.current?.readyState]);
 
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };
  


  const whilePlaying = () => {
    props.progressBar.current.value = props.audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    props.animationRef.current = requestAnimationFrame(whilePlaying);
    props.audioPlayer.current.volume = 0.8;
  };




  const prevValue = props.isPlaying;
  const TooglePlayPause = () => {
  
    props.setIsPlaying(!prevValue);
    if (!prevValue) {
  
      props.audioPlayer.current.play();
      props.animationRef.current = requestAnimationFrame(whilePlaying);
      props.setRotate("rotatePlayer 3s linear infinite");
    } else {
      props.audioPlayer.current.pause();
      // cancelAnimationFrame(animationRef.current);
      props.setRotate("none");
    }
  };




  const changeRange = () => {
    props.audioPlayer.current.currentTime = props.progressBar.current.value;
    changePlayerCurrentTime();
  };
  const changePlayerCurrentTime = () => {
    let totalprogressbar = (props.progressBar.current.value / props.duration) * 100;
    props.progressBar.current.style.setProperty(
      "--seek-before-width",
      `${totalprogressbar}%`
    );
    props.setCurrentTime(props.progressBar.current.value);
  };

  const backThirty = () => {
    props.progressBar.current.value = props.progressBar.current.value - 30;
    changeRange();
  };
  const forwardThirty = () => {
    props.progressBar.current.value = Number(props.progressBar.current.value) + 30;
    changeRange();
  };
  const skipSongForward = () => {
    props.setCurrentIndex((props.currentIndex + 1) % props.jsondata.length);
    props.setCurrentTime("0");
    changeRange();
    props.progressBar.current.style.setProperty("--seek-before-width", `0%`);
    if (!prevValue){
    
      props.setIsPlaying(!prevValue);
      props.animationRef.current = requestAnimationFrame(whilePlaying);
      props.setRotate("rotatePlayer 3s linear infinite");
      }
   
  };
  const skipSongBackward = () => {
    props.setCurrentIndex((props.currentIndex - 1 + props.jsondata.length) % props.jsondata.length);
    props.setCurrentTime("0");
    changeRange();
    props.progressBar.current.style.setProperty("--seek-before-width", `0%`);
    if (!prevValue){
    
      props.setIsPlaying(!prevValue);
      props.animationRef.current = requestAnimationFrame(whilePlaying);
      props.setRotate("rotatePlayer 3s linear infinite");
      }
  };

  useEffect(() => {
    if (props.duration == props.currentTime) {
      skipSongForward();
      // TooglePlayPause();
    }
  }, [props.currentTime]);
  
  useEffect(() => {
    if (prevValue) {
      props.setIsPlaying(!prevValue);
      props.setRotate("none");
      
    
    }
  }, []);
  



  return (
    <>
     
      <div className="audioControl">
        <div className="Music-container">
          <img
            style={{ animation: props.rotate }}
            src={props.jsondata[props.currentIndex].cover}
            alt={props.jsondata[props.currentIndex].name}
            className="cover-image"
          />
          <p className="music-Title">
            {props.jsondata[props.currentIndex].name}
            <br />{" "}
            <span className="music-singer">
              {" "}
              {props.jsondata[props.currentIndex].singer}
            </span>
          </p>

          <div className="music-button">
            <button className="btn-center" title="Shuffle" >
              <FiShuffle />
            </button>

            <button
              className="btn-center"
              title="Prev Song"
              onClick={skipSongBackward}
            >
              <IoPlaySkipBack />
            </button>
            <button
              className="btn-center"
              onClick={backThirty}
              title="Back 30 sec"
            >
              <IoPlayBack />
            </button>
            <button
              className="btn-center"
              title={!prevValue ? "Play" : "Pause"}
              onClick={TooglePlayPause}
            >
              {prevValue ? <IoPause /> : <IoPlay />}
            </button>
            <button
              className="btn-center"
              onClick={forwardThirty}
              title="Skip 30 sec"
            >
              <IoPlayForward />
            </button>
            <button
              className="btn-center"
              title="Next Song"
              onClick={skipSongForward}
            >
              <IoPlaySkipForward />
            </button>

            <button className="btn-center" title="Loop">
              <MdRepeat />
            </button>
          </div>
          <p className="start-time">{calculateTime(props.currentTime)}</p>
          <div className="music-slider">
            <input
              type="range"
              defaultValue="0"
              ref={props.progressBar}
              onChange={changeRange}
              className="progressBar"
            />
          </div>
          <p className="end-time">
            {props.duration
              ? props.duration && !isNaN(props.duration) && calculateTime(props.duration)
              : "00:00"}
          </p>
          <div className="right-element">
            <button className="btn-right">
              <HiVolumeUp className="volume-slider" title="Volume" />
              <div>
                <input type="range" min="0" max="100" id="volumeRange" />
              </div>
            </button>
            <button className="btn-right">
              <div className="Play-list"></div>
              <RiPlayListFill />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Control;
