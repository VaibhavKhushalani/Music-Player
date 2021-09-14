import React from "react";
import "./Player.css";
import { BiHome } from "react-icons/bi";
import { BsCollectionPlay } from "react-icons/bs";
const Sidebar = () => {
  return (
    <>
      <div className="sidebar-container">
        <ul className="sidebar-navigation">
          <li>
            <a href="##">
              <BiHome fontSize="19" /> &nbsp;Home
            </a>
          </li>
          <li>
            <a href="##">
              <BsCollectionPlay fontSize="18" /> &nbsp;Library
            </a>
          </li>
          <li className="header">Recommended</li>
          <li>
            <a href="##">Songs</a>
          </li>
          <li>
            <a href="##">Artists</a>
          </li>
          <li>
            <a href="##">Albums</a>
          </li>
          <li>
            <a href="##">Concerts</a>
          </li>
          <li className="header">Library</li>
          <li>
            <a href="##">Liked</a>
          </li>
          <li>
            <a href="##">Recent Played</a>
          </li>
          <li>
            <a href="##">My Playlists</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
