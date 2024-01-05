import React, { useState, useEffect } from "react";
import Spotify from "../../util/spotify";
import styles from "./PlaylistList.module.css"

const PlaylistList = () => {
    const [state, setState] = useState({
        playlists: [],
    })

    useEffect(() => {

    })

    return(
        <div>
            <h1>Local Playlists</h1>
        </div>
    );
}

export default PlaylistList;