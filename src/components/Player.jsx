import React from "react";
import Control from "./Control";
import jsondata from "./s.json";
import Sidebar from "./Sidebar";
import MusicList from "./MusicList";

const Player = () => {
 
  return (
    <>
      <Sidebar />
      <MusicList />
      <Control jsondata={jsondata} />
    </>
  );
};

export default Player;
