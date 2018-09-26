import React, { Component } from 'react';
import './App.css';
import LoginPage from './containers/LoginPage'
import Main from './containers/Main'
import SpotifyWebApi from 'spotify-web-api-js'

// const shopify_api_key = process.env.REACT_APP_SPOTIFY_API_KEY
// const shopify_secrete_key = process.env.REACT_APP_SPOTIFY_SECRET

const spotifyApi = new SpotifyWebApi();
// Source code: https://github.com/JMPerez/spotify-web-api-js/blob/master/src/spotify-web-api.js


class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if(token){
      spotifyApi.setAccessToken(token);
    }

    this.state = {
      loggedIn: token ? true : false,
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
    const appStyle = {
      display: "flex",
      justifyContent: "center",
      // backgroundImage: `url(http://foothillertech.com/student/webdesign/2017/02_20/Assets/Images/Bg.gif)`,
    }
    return (
      <div style={appStyle}>
        {this.state.loggedIn ? <Main /> : <LoginPage />}
      </div>
    );
  }
}

export default App;
