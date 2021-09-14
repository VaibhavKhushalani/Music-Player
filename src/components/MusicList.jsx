import React from "react";
import "./Player.css";





const MusicList = (props) => {
  const prevValue = props.isPlaying;
const Playmusic=(e)=>{
  if (e.target.id){
  props.setCurrentIndex(e.target.id)
  // console.log(e.target.id)
  console.log(e.target.id)
props.audioPlayer.current.play()
if (!prevValue){
props.setIsPlaying(!prevValue);
}
}}

  return (
    <>
       
      <div className="List-container">
        <div className="sidebar-logo">Trending Albums</div>
     
        {props.jsondata.map((data,id) => {
   
     return(
         
            <>
     
              <ul className="MusicList-navigation" key={data.id} >
                <li >
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
  );
};

export default MusicList;
