import React, { Component } from 'react';
import './App.css';
import LoginPage from './containers/LoginPage'
import Node from './Node'

import SpotifyWebApi from 'spotify-web-api-js'
import TreeHome from './TreeHome'
import ArtistCard from './ArtistCard'
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
      loggedIn: token ? true : false,
      artistNode: {},
      tree: []
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


  findArtistByTerm = (searchTerm) => {
    let artistObject = {};

    return spotifyApi.searchArtists(searchTerm)
      .then(resp => {
        artistObject['artist'] = resp.artists.items[0];
        artistObject['market'] = resp.artists.href.split("&").find( (string) => (string.includes("market"))).split("=")[1];

        return artistObject
      })
  }


  instantiateRoot = (searchTerm) => {
    let artistNode;

    this.findArtistByTerm(searchTerm)
      .then( artistObject => {

        this.buildArtistNode(artistObject)
        .then( node => {
          artistNode = node

          this.getRelatedArtistNodes(node.intId)
            .then( artistsArray => {
              artistNode.children = artistsArray

              this.setState({
                tree: [artistNode],
                artistNode
              })
            })
        })
      })
    }


  async relatedArtistsToNodes(relatedArtists){

    let promise = new Promise((resolve, reject) => {
      let artistsArray = [];

      relatedArtists.forEach(async (artist) => {

        this.findArtistByTerm(artist.name)
          .then(artistObject => {

            this.buildArtistNode(artistObject)
              .then( node => {

                artistsArray.push(node)
              })
          })
      })
      setTimeout(()=>resolve(artistsArray), 1000)
    })

    let result = await promise;
    return result


  }


  getRelatedArtistNodes = (artistId) => {

    return spotifyApi.getArtistRelatedArtists(artistId)
      .then(resp => {
        let relatedArtists = resp.artists.splice(0,3);

        return this.relatedArtistsToNodes(relatedArtists)
          .then(artistsArray => {
              return artistsArray
          })
      })
  }


  buildArtistNode = (artistObject) => {
    return spotifyApi.getArtistTopTracks(artistObject.artist.id, artistObject.market)
      .then(resp => {
        artistObject['topTracks'] = resp.tracks.splice(0,3);
        return Node.returnNode(artistObject)
      })
  }


  handleClick = (e) => {
    let node = Node.findNode(this.state.tree[0], e.intId)

    if(node.children.length > 0){
      console.log("Already children")

    } else {
      this.getRelatedArtistNodes(e.intId)
        .then( artistsArray => {
          let tree = Node.insertRecsAt(this.state.tree[0], e.intId, artistsArray)

          this.setState({tree: [tree]})
        })
    }
  }


  render() {
    return (
      <div className="App">
        {
          this.state.loggedIn ?
          <Main />
          :
          <LoginPage />
        }
        {
          Object.keys(this.state.artistNode).length > 0 ?
          <TreeHome tree={this.state.tree} clickedNode={this.handleClick} style={{margin: "0 auto"}}/>
          :
          null
        }
      </div>
    );
  }
}

export default App;
