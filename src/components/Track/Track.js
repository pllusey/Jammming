import React, { useCallback } from "react";

import styles from "./Track.module.css";

const Track = (props) => {
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
        <h3>{props.track.name}</h3>
        <p>
          {props.track.artist} | {props.track.album}
        </p>
      </div>
      {renderAction()}
    </div>
  );
};

export default Track;
