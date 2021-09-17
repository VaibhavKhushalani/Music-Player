import React,{ useState,useRef,useEffect} from "react";
import Control from "./Control";
import jsondata from "./s.json";
import Sidebar from "./Sidebar";
import MusicList from "./MusicList";
import MiddleComp from "./MiddleComp";


const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotate, setRotate] = useState("none");
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [auto, setAuto] = useState(true)

    //reference
  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  useEffect(() => {
  setAuto(false);
    
  }, []);

 

  return (
    <>
   
     <audio ref={audioPlayer} src={jsondata[currentIndex].musicSrc} autoPlay={auto}  />



     
      <Sidebar />

      
      <MusicList jsondata= {jsondata} audioPlayer={audioPlayer} progressBar={progressBar} animationRef={animationRef} isPlaying= {isPlaying} setIsPlaying={setIsPlaying} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}  rotate={rotate} setRotate={setRotate} duration={duration} setDuration={setDuration} currentTime={currentTime} setCurrentTime={setCurrentTime} setAuto={setAuto}/>
      
      <MiddleComp jsondata= {jsondata} audioPlayer={audioPlayer} progressBar={progressBar} animationRef={animationRef} isPlaying= {isPlaying} setIsPlaying={setIsPlaying} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}  rotate={rotate} setRotate={setRotate} duration={duration} setDuration={setDuration} currentTime={currentTime} setCurrentTime={setCurrentTime} setAuto={setAuto}/>


      <Control jsondata= {jsondata} audioPlayer={audioPlayer} progressBar={progressBar} animationRef={animationRef} isPlaying= {isPlaying} setIsPlaying={setIsPlaying} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}  rotate={rotate} setRotate={setRotate} duration={duration} setDuration={setDuration} currentTime={currentTime} setCurrentTime={setCurrentTime} setAuto={setAuto} />
     
    </>
  );
};

export default Player;
