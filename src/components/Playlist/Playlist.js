import React, { useCallback } from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./Playlist.module.css"

const Playlist = (props) => {
  const handleNameChange = useCallback(
    (e) => {
      props.onNameChange(e.target.value);
    },
    [props.onNameChange]
  );

  return (
    <div className="Playlist">
      <input defaultValue="New Playlist" onChange={handleNameChange} />
      <Tracklist
        tracks={props.playlistTracks}
        isRemoval={true}
        onRemove={props.onRemove}
      />
      <button className="save-btn" onClick={props.onSave}>
        Save to Spotify
      </button>
    </div>
  );
};

export default Playlist;
