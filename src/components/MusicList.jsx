import React from "react";
import "./Player.css";

const MusicList = (props) => {
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
      
      if (!prevValue) {
        props.setIsPlaying(!prevValue);
        props.animationRef.current = requestAnimationFrame(whilePlaying);
        props.setRotate("rotatePlayer 3s linear infinite");
       
  
      }
    }
  };

  return (
    <>
      <div className="List-container">
        <div className="sidebar-logo">Trending Albums</div>

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
  );
};

export default MusicList;
