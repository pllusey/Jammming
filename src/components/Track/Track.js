import React, { useCallback } from "react";

import styles from "./Track.module.css";

const Track = (props) => {
  const truncateTrackName = () => {
    if (props.track.name.length > 32) {
      return props.track.name.slice(0, 32) + '...';
    }
    return props.track.name
  }

  const addTrack = useCallback(
    (e) => {
      props.onAdd(props.track);
    },
    [props.onAdd, props.track]
  );

  const removeTrack = useCallback(
    (e) => {
      props.onRemove(props.track);
    },
    [props.onRemove, props.track]
  );

  const renderAction = () => {
    if (props.isRemoval) {
      return (
        <button className={styles.track_action} onClick={removeTrack}>
          -
        </button>
      );
    }
    return (
      <button className={styles.track_action} onClick={addTrack}>
        +
      </button>
    );
  };

  return (
    <div className={styles.track}>
      <div className={styles.track_information}>
        <h3>{truncateTrackName()}</h3>
        <p>
          {props.track.artist} | {props.track.album}
        </p>
      </div>
      {renderAction()}
    </div>
  );
};

export default Track;
