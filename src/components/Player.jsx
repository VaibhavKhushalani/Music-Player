import React,{ useState,useRef} from "react";
import Control from "./Control";
import jsondata from "./s.json";
import Sidebar from "./Sidebar";
import MusicList from "./MusicList";


const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotate, setRotate] = useState("none");
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

    //reference
  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();





  return (
    <>
   
     <audio ref={audioPlayer} src={jsondata[currentIndex].musicSrc} autoPlay />
      <Sidebar />

      
      <MusicList jsondata= {jsondata} audioPlayer={audioPlayer} progressBar={progressBar} animationRef={animationRef} isPlaying= {isPlaying} setIsPlaying={setIsPlaying} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}  rotate={rotate} setRotate={setRotate} duration={duration} setDuration={setDuration} currentTime={currentTime} setCurrentTime={setCurrentTime}/>



      <Control jsondata= {jsondata} audioPlayer={audioPlayer} progressBar={progressBar} animationRef={animationRef} isPlaying= {isPlaying} setIsPlaying={setIsPlaying} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}  rotate={rotate} setRotate={setRotate} duration={duration} setDuration={setDuration} currentTime={currentTime} setCurrentTime={setCurrentTime} />
    </>
  );
};

export default Player;
