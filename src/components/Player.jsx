import React,{ useState,useRef} from "react";
import Control from "./Control";
import jsondata from "./s.json";
import Sidebar from "./Sidebar";
import MusicList from "./MusicList";


const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioPlayer = useRef();
  return (
    <>
     <audio ref={audioPlayer} src={jsondata[currentIndex].musicSrc} autoPlay />
      <Sidebar />
      <MusicList jsondata= {jsondata} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} audioPlayer={audioPlayer}/>
      <Control jsondata= {jsondata} isPlaying= {isPlaying} setIsPlaying={setIsPlaying} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} audioPlayer={audioPlayer} />
    </>
  );
};

export default Player;
