import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';

const defaultPlaylistName = 'My playlist';

Spotify.getAccessToken();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            playlistName: defaultPlaylistName,
            playlistTracks: [],
        }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    addTrack(track) {
        if (!this.state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
          this.setState(prevState => ({
            playlistTracks: [...prevState.playlistTracks, track]
          }));
        }
    }

    removeTrack(track) {
        this.setState({
          playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
        });
    }

    updatePlaylistName(name) {
        this.setState({
          playlistName: name
        });
    }

    savePlaylist() {
        let trackUris = this.state.playlistTracks.map(track => track.uri);
        Spotify.savePlaylist(this.state.playlistName, trackUris);
        this.setState({
          searchResults: []
        });
        this.updatePlaylistName(defaultPlaylistName);
    }

    search(term) {
        Spotify.search(term)
        .then(searchResults => this.setState({
            searchResults: searchResults
        }));
    }

    render() {
        const { playlistName } = this.props;
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search} />
                    <div className="App-playlist">
                        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
                        <Playlist playlistName={playlistName} tracks={this.state.playlistTracks} onRemoval={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;