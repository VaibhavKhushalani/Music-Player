import React,{useState}from "react";
import "./Player.css";
import {IoClose} from "react-icons/io5"
import {BsMusicNoteList} from "react-icons/bs"


const MusicList = (props) => {
  const [show, setShow] =useState('none')
 
  const Closelist =()=>{
setShow('none')
if (show=='none'){
  setShow('block')
}

  } 




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
      props.setAuto(true)
      if (!prevValue) {
        props.setIsPlaying(!prevValue);
        props.animationRef.current = requestAnimationFrame(whilePlaying);
        props.setRotate("rotatePlayer 3s linear infinite");
       
  
      }
    }
  };

  if (show=='none'){
    return (
      <spam><button className="btn-listClose" title="Music-List" onClick={Closelist}><BsMusicNoteList/></button></spam>
    )
  }else{
  return (
    <>
  
      <div className="List-container" style={{display: show}}>
        <div className="sidebar-logo">Music List<spam><button onClick={Closelist} className="btn-list" title="Close"><IoClose/></button></spam></div>

        {props.jsondata.map((data, id) => {
          return (
            <>
              <ul className="MusicList-navigation" key={data.id}>
                <li>
                  <a href="##" type="button" id={id} onClick={Playmusic}>
                    {data.id} &nbsp; {data.name}
                    <span className="detail-List">By- {data.singer}</span>
                  </a>
                </li>
              </ul>
            </>
          );
        })}
      </div>
    </>
  )}
};

export default MusicList;
