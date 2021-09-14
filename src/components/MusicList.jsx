import React from "react";
import "./Player.css";





const MusicList = (props) => {
  const prevValue = props.isPlaying;
const Playmusic=(e)=>{
  props.setCurrentIndex(e.target.id-1)
props.audioPlayer.current.play()
if (!prevValue){
props.setIsPlaying(!prevValue);
}}

  return (
    <>
       
      <div className="List-container">
        <div className="sidebar-logo">Trending Albums</div>
     
        {props.jsondata.map((data) => {
     
     return(
         
            <>
     
              <ul className="MusicList-navigation" key={data.id} >
                <li >
                  <a href="##" type="button" id={data.id} onClick={Playmusic}>
                   
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
  );
};

export default MusicList;
