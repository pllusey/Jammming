const clientId = "e9fb34636dfa4fdb87ac88473b11e91a";
const redirectUri = "http://localhost:3000";
let accessToken;
let userId;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  async getCurrentUserId() {
    if (!userId) {
      const accessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };

      return fetch("https://api.spotify.com/v1/me", { headers: headers })
        .then((response) => response.json())
        .then((jsonResponse) => {
          userId = jsonResponse.id;
        });
    }
    return userId;
  },

  async search(term) {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: headers,
      }
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    if (!jsonResponse.tracks) {
      return [];
    }
    return jsonResponse.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const headers = { Authorization: `Bearer ${accessToken}` };

    Spotify.getCurrentUserId()
      .then(
        fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: name }),
        })
      )
      .then((response) => response.json())
      .then((jsonResponse) => {
        const playlistId = jsonResponse.id;
        return fetch(
          `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
          {
            headers: headers,
            method: "POST",
            body: JSON.stringify({ uris: trackUris }),
          }
        );
      });
  },

  async getUserPlaylists(userId) {
    const headers = { Authorization: `Bearer ${accessToken}` };

    Spotify.getCurrentUserId().then(
      await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/`, {
        headers: headers,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch playlists.");
        }
        return response.json();
      })
      .then(data => {
        const playlists = data.items.map(playlist => ({
          playlistId: playlist.id,
          name: playlist.name,
        }));

      })
      .catch(error => {
        console.error('Error fetching Playlists:', error);
      })
    );
  },
};

export default Spotify;
