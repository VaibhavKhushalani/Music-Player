import React, { useState, useRef, useEffect } from "react";
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

const Control = ({ jsondata }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotate, setRotate] = useState("none");
  // const [loading, setLoading] = useState(true);
  
  //reference
  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);
  // console.log(audioPlayer?.current?.loadedmetadata,audioPlayer?.current?.readyState)
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const TooglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
      setRotate("rotatePlayer 3s linear infinite");
    } else {
      audioPlayer.current.pause();
      // cancelAnimationFrame(animationRef.current);
      setRotate("none");
    }
  };
  // useEffect(() => {
  //   audioPlayer.current.readyState>0?console.log("bahut ache"):console.log("burrrrrrreee")
  //   const prevValue = isPlaying;
  //   setIsPlaying(prevValue);
  //    },[TooglePlayPause]);
  // console.log(audioPlayer.current)

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
    audioPlayer.current.volume = 0.4;
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };
  const changePlayerCurrentTime = () => {
    let totalprogressbar = (progressBar.current.value / duration) * 100;
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${totalprogressbar}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const backThirty = () => {
    progressBar.current.value = progressBar.current.value - 30;
    changeRange();
  };
  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value) + 30;
    changeRange();
  };
  const skipSongForward = () => {
    setCurrentIndex((currentIndex + 1) % jsondata.length);
    setCurrentTime("0");
    changeRange();
    progressBar.current.style.setProperty("--seek-before-width", `0%`);
    if (isPlaying) {
      const prevValue = isPlaying;
      setIsPlaying(!prevValue);
      setRotate("none");
    }
  };
  const skipSongBackward = () => {
    setCurrentIndex((currentIndex - 1 + jsondata.length) % jsondata.length);
    setCurrentTime("0");
    progressBar.current.style.setProperty("--seek-before-width", `0%`);
  };

  // useEffect(() => {
  //   if (duration == currentTime) {
  //     skipSongForward();
  //     // TooglePlayPause();
  //   }
  // }, [currentTime]);

  return (
    <>
      <audio ref={audioPlayer} src={jsondata[currentIndex].musicSrc} autoplay />
      <div className="audioControl">
        <div className="Music-container">
          <img
            style={{ animation: rotate }}
            src={jsondata[currentIndex].cover}
            alt={jsondata[currentIndex].name}
            className="cover-image"
          />
          <p className="music-Title">
            {jsondata[currentIndex].name}
            <br />{" "}
            <span className="music-singer">
              {" "}
              {jsondata[currentIndex].singer}
            </span>
          </p>

          <div className="music-button">
            <button className="btn-center" title="Shuffle">
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
              title={!isPlaying ? "Play" : "Pause"}
              onClick={TooglePlayPause}
            >
              {isPlaying ? <IoPause /> : <IoPlay />}
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
          <p className="start-time">{calculateTime(currentTime)}</p>
          <div className="music-slider">
            <input
              type="range"
              defaultValue="0"
              ref={progressBar}
              onChange={changeRange}
              className="progressBar"
            />
          </div>
          <p className="end-time">
            {duration
              ? duration && !isNaN(duration) && calculateTime(duration)
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
