import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js'
import { Route } from 'react-router-dom'
import TreeHome from './TreeHome'
import Search from './Search'
import ErrorPage from './ErrorPage'
// Source code: https://github.com/JMPerez/spotify-web-api-js/blob/master/src/spotify-web-api.js
const spotifyApi = new SpotifyWebApi();


const shopify_api_key = process.env.REACT_APP_SPOTIFY_API_KEY
const shopify_secrete_key = process.env.REACT_APP_SPOTIFY_SECRET


class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();

    console.log("params: ",params)

    const token = params.access_token;
    if(token){
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true: false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
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

  render() {
    // let keys_exist = Object.keys(params).length > 1 || null
    return (
      <div className="App">
        <a href='http://localhost:8888'>Login to Spotify </a>
        <Route path="/search" component={()=>(<Search spotifyApi={spotifyApi} />)}/>
        <Route path="/tree" component={TreeHome}/>
        <Route path="/error" component={ErrorPage}/>
      </div>
    );
  }
}

export default App;
