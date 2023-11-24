import React, { useCallback, useState } from "react";
import styles from "./App.module.css";

import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";

const App = () => {
  const tracks = [
    {
      id: 1,
      name: "Song 1",
      artist: "Artist 1",
      album: "Album 1",
    },
    {
      id: 2,
      name: "Song 2",
      artist: "Artist 2",
      album: "Album 2",
    },
    {
      id: 3,
      name: "Song 3",
      artist: "Artist 3",
      album: "Album 3",
    },
  ];

  const uri = [
    
  ]

  const [searchResults, setSearchResults] = useState(tracks);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      id: 4,
      name: "Song 4",
      artist: "Artist 4",
      album: "Album 4",
    },
    {
      id: 5,
      name: "Song 5",
      artist: "Artist 5",
      album: "Album 5",
    },
    {
      id: 6,
      name: "Song 6",
      artist: "Artist 6",
      album: "Album 6",
    },
  ]);

  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults);
  }, []);

  const addTrack = useCallback(
    (term) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
        return;

      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    },
    [playlistTracks]
  );

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);

  return (
    <div>
      <h1>
        JA<span className={styles.highlight}>MMM</span>ING
      </h1>
      <div className={styles.app}>
        <SearchBar onSearch={search} />
        <div className={styles.app_playlist}>
          <SearchResults searchResults={searchResults} onAdd={addTrack}/>
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTrack}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
