import React, { useState, useEffect, useRef } from "react";
import { FiShuffle } from "react-icons/fi";
import {
  IoPlaySkipForward,
  IoPlayForward,
  IoPause,
  IoPlay,
  IoPlaySkipBack,
  IoPlayBack,
  IoVolumeLow,
  IoVolumeHigh,
  IoVolumeMute,
  IoVolumeMedium,
} from "react-icons/io5";
import { MdRepeat, MdRepeatOne } from "react-icons/md";

const Control = (props) => {
  const [volslider, setVolslider] = useState(8);
  const [shuffle, setShuffle] = useState(false);
  const [loop, setLoop] = useState("#a2a4a7");
  const volumeRange = useRef();

  //random No Generator
  function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let shuffleOn = randomNumber(0, props.jsondata.length - 1);

  useEffect(() => {
    const seconds = Math.floor(props.audioPlayer.current.duration);
    props.setDuration(seconds);
    props.progressBar.current.max = seconds;
    props.animationRef.current = requestAnimationFrame(whilePlaying);
  }, [
    props.audioPlayer?.current?.loadedmetadata,
    props.audioPlayer?.current?.readyState,
  ]);

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
  };

  const prevValue = props.isPlaying;
  const TooglePlayPause = () => {
    props.setIsPlaying(!prevValue);
    props.setAuto(true);
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

  const changeVolume = (e) => {
    setVolslider(e.target.valueAsNumber);
    let finalVolume = volslider ** 1;
    volumeRange.current.style.setProperty(
      "--seek-before-width",
      `${finalVolume.toFixed(0)}%`
    );
    let volume = finalVolume.toFixed(0) * 0.125;
    props.audioPlayer.current.volume = volume;
  };

  const changeRange = () => {
    props.audioPlayer.current.currentTime = props.progressBar.current.value;
    changePlayerCurrentTime();
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

  const backThirty = () => {
    props.progressBar.current.value = props.progressBar.current.value - 30;
    changeRange();
  };
  const forwardThirty = () => {
    props.progressBar.current.value =
      Number(props.progressBar.current.value) + 30;
    changeRange();
  };
  const skipSongForward = () => {
    props.setAuto(true);
    shuffle == "#d95117"
      ? props.setCurrentIndex(shuffleOn)
      : props.setCurrentIndex((props.currentIndex + 1) % props.jsondata.length);
    props.setCurrentTime("0");
    changeRange();
    props.progressBar.current.style.setProperty("--seek-before-width", `0%`);
    if (!prevValue) {
      props.setIsPlaying(!prevValue);
      props.animationRef.current = requestAnimationFrame(whilePlaying);
      props.setRotate("rotatePlayer 3s linear infinite");
    }
  };
  const skipSongBackward = () => {
    props.setAuto(true);
    shuffle == "#d95117"
      ? props.setCurrentIndex(shuffleOn)
      : props.setCurrentIndex(
          (props.currentIndex - 1 + props.jsondata.length) %
            props.jsondata.length
        );
    props.setCurrentTime("0");
    changeRange();
    props.progressBar.current.style.setProperty("--seek-before-width", `0%`);
    if (!prevValue) {
      props.setIsPlaying(!prevValue);
      props.animationRef.current = requestAnimationFrame(whilePlaying);
      props.setRotate("rotatePlayer 3s linear infinite");
    }
  };

  useEffect(() => {
    if (props.duration == props.currentTime) {
      skipSongForward();
    }
    if (props.duration == props.currentTime && loop == "#d95117") {
      props.setCurrentIndex(props.currentIndex % props.jsondata.length);
      TooglePlayPause();
    }
  }, [props.currentTime]);
  useEffect(() => {
    if (!prevValue) {
      props.setIsPlaying(prevValue);
      props.setRotate("none");
    }
  }, []);

  const shuffleSong = () => {
    setShuffle("#d95117");
    if (shuffle === "#d95117") {
      setShuffle("#a2a4a7");
    }
  };

  const Volumeicon = () => {
    if (props.audioPlayer?.current?.volume > 0.7) {
      return <IoVolumeHigh />;
    } else if (props.audioPlayer?.current?.volume > 0.4) {
      return <IoVolumeMedium />;
    } else if (props.audioPlayer?.current?.volume === 0) {
      return <IoVolumeMute />;
    } else {
      return <IoVolumeLow />;
    }
  };
  useEffect(() => {
    Volumeicon();
  }, [props.audioPlayer?.current?.volume]);

  const loopsong = () => {
    setLoop("#d95117");
    if (loop === "#d95117") {
      setLoop("#a2a4a7");
    }
  };

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
            <button
              className="btn-center"
              title={shuffle === "#d95117" ? "shuffle on" : "shuffle off"}
              onClick={shuffleSong}
              style={{ color: shuffle }}
            >
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

            <button
              className="btn-center"
              title={loop === "#d95117" ? "Loop once" : "Loop all"}
              style={{ color: loop }}
              onClick={loopsong}
            >
              {loop === "#a2a4a7" ? <MdRepeat /> : <MdRepeatOne />}
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
              ? props.duration &&
                !isNaN(props.duration) &&
                calculateTime(props.duration)
              : "00:00"}
          </p>
          <button className="btn-right" title="Volume">
            <Volumeicon />
          </button>
          <div className="right-element">
            <input
              type="range"
              ref={volumeRange}
              min="0"
              max="8"
              step={0.02}
              value={volslider}
              onChange={changeVolume}
              className="volumeRange"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Control;
