import React from "react";
import jsondata from "./s.json";
import "./Player.css";




const MusicList = () => {
// const [currentIndex, setCurrentIndex] = useState(1);

  // const audioPlayer = useRef();
  // audioPlayer.current.play();
// const Playmusic=()=>{
 
//   setCurrentIndex(jsondata[currentIndex].id)

// console.log(currentIndex)
// }

  return (
    <>
      <div className="List-container">
        <div className="sidebar-logo">Trending Albums</div>
        {/* <audio ref={audioPlayer} src={jsondata[currentIndex].musicSrc} /> */}
        {jsondata.slice(0, 5).map((data) => {
      //  console.log(data.id)
          return (
            <>
      
              <ul className="MusicList-navigation" key={data.id} >
                <li >
                  <a href="##"  >
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
