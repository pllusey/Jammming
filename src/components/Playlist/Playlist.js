import React, { useCallback } from "react";

import styles from "./Playlist.module.css";

import Tracklist from "../Tracklist/Tracklist";

const Playlist = (props) => {
  const handleNameChange = useCallback(
    (e) => {
      props.onNameChange(e.target.value);
    },
    [props.onNameChange]
  );

  return (
    <div className={styles.playlist}>
      <input defaultValue="New Playlist" onChange={handleNameChange} />
      <Tracklist
        tracks={props.playlistTracks}
        isRemoval={true}
        onRemove={props.onRemove}
      />
      <button className={styles.playlist_save} onClick={props.onSave}>
        Save to Spotify
      </button>
    </div>
  );
};

export default Playlist;
