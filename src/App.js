import React, { Component } from 'react';
import './App.css';
import Node from './Node'
import SpotifyWebApi from 'spotify-web-api-js'
import TreeHome from './TreeHome'
import Search from './Search'
// Source code: https://github.com/JMPerez/spotify-web-api-js/blob/master/src/spotify-web-api.js
const spotifyApi = new SpotifyWebApi();

// const shopify_api_key = process.env.REACT_APP_SPOTIFY_API_KEY
// const shopify_secrete_key = process.env.REACT_APP_SPOTIFY_SECRET


class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if(token){
      spotifyApi.setAccessToken(token);
    }

    this.state = {
      loggedIn: token ? true: false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      rootArtist: {},
      tree: [
        {
          name: 'Top Level',
          attributes: {
            keyA: 'val A',
            keyB: 'val B',
            keyC: 'val C',
          },
          children: [
            {
              name: 'Level 2: A',
              attributes: {
                keyA: 'val A',
                keyB: 'val B',
                keyC: 'val C',
              },
            },
            {
              name: 'Level 2: B',
            },
          ],
        },
      ]
     }
  }

  getHashParams(){
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)

    while(e){
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  setInitialArtist = (searchTerm) => {
    // sets state with an object with spotify artist info, top 3 tracks, and top 3 recommended artists
    let rootArtist = {};

    spotifyApi.searchArtists(searchTerm)
      .then(resp => {
        rootArtist['artist'] = resp.artists.items[0];
        rootArtist['market'] = resp.artists.href.split("&").find( (string) => (string.includes("market"))).split("=")[1];

        spotifyApi.getArtistTopTracks(rootArtist.artist.id, rootArtist.market)
          .then(resp => {
            rootArtist['topTracks'] = resp.tracks.splice(0,3);

            spotifyApi.getArtistRelatedArtists(rootArtist.artist.id)
              .then(resp => {
                rootArtist['relatedArtists'] = resp.artists.splice(0,3);

                this.setState({
                  rootArtist: rootArtist
                }, ()=>{
                  this.buildRoot();
                  console.log("Setting App State: ", this.state.rootArtist)
                })
              })
          })
      })
  }


  buildRoot = () => {
    let { artist, topTracks, relatedArtists } = this.state.rootArtist;
    let


    spotifyApi.getArtistTopTracks()


    let node = Node.returnNode(artist, topTracks)
    console.log(node)
    console.log("relatedArtists:", relatedArtists)

    Node.addChildren(node, relatedArtists)

    this.setState({
      tree: [node]
    })
  }

  // buildTree = (insertAt) => {
  //
  // }

  handleClick = (e) => {
    debugger

    let artistId = e.intId
  }


  render() {
    console.log(this.state.rootArtist)
    return (
      <div className="App">
        { this.state.loggedIn ? <Search handleSubmit={(searchTerm)=>{this.setInitialArtist(searchTerm)}} /> : <a href='http://localhost:8888'>Login to Spotify </a> }
        { Object.keys(this.state.rootArtist).length > 0 ? <TreeHome tree={this.state.tree} clickedNode={this.handleClick} /> : null }
      </div>
    );
  }
}

export default App;
