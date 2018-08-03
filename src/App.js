import React, { Component } from 'react';
import './App.css';
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
      loggedIn: token ? true: false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      artistNode: {},
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
              }, ()=>{console.log("Set state with new tree:", this.state.tree)} )
            })
        })
      })
    }


  async relatedArtistsToNodes(relatedArtists){

    let promise = new Promise((resolve, reject) => {
      let artistsArray = [];

      relatedArtists.forEach(artist => {

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

    // let artistsArray = [];

    // relatedArtists.forEach(async artist => {
    //   // let node = await this.findArtistByTerm(artist.name)
    //   //   .then(artistObject => {
    //   //     return await this.buildArtistNode(artistObject)
    //   //   })
    //   let artistObject = await this.findArtistByTerm(artist.name)
    //   console.log("ArtistObject:", artistObject)
    //   let node = await this.buildArtistNode(artistObject)
    //   console.log("Node:", node)
    //   artistsArray.push(node)
    // })

    // return await relatedArtists.map(async artist => {
    //   let artistObject = await this.findArtistByTerm(artist.name)
    //   console.log("ArtistObject:", artistObject)
    //   let node = await this.buildArtistNode(artistObject)
    //   console.log("node:", node)
    //   return node
    // })
    //
    // console.log("artistsArray:", artistsArray)
    //
    // return artistsArray
    //
    // let promises = relatedArtists.map(artist => {
    //   return async () => {
    //     let artistObject = await this.findArtistByTerm(artist.name)
    //     console.log("ArtistObject:", artistObject)
    //     let node = await this.buildArtistNode(artistObject)
    //     console.log("node:", node)
    //     return node
    //   }
    // })
    // let result = await Promise.all(promises)
    //
    // console.log(result);
    // return result;
  }


  getRelatedArtistNodes = (artistId) => {

    return spotifyApi.getArtistRelatedArtists(artistId)
      .then(resp => {
        let relatedArtists = resp.artists.splice(0,3);
        console.log(relatedArtists)

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
        console.log(resp)
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

          this.setState({
            tree: [tree]
          }, ()=>{console.log("Set state with new tree:", this.state.tree)} )
        })
      }

    }


  render() {
    let artist = {
      url: "https://open.spotify.com/artist/7Ey4PD4MYsKc5I2dolUwbH",
      genres: ["album rock", "classic rock", "hard rock", "rock"],
      id: "7Ey4PD4MYsKc5I2dolUwbH",
      imageUrl: "https://i.scdn.co/image/81442527ebb3ff17f86fde87f75f96fd80a5d97c",
      name: "Aerosmith",
      songs: ["spotify:track:07rjmFuB0I2O1UuIPnu6Qj","spotify:track:2ZkbS5VzMPOH8ZKvGNqnUj","spotify:track:1Lc9JahgQBinguxIJREPfd"]
    }
    return (
      <div className="App">
        <ArtistCard artist={artist}/>
        { this.state.loggedIn ? <Search handleSubmit={(searchTerm)=>{this.instantiateRoot(searchTerm)}} /> : <a href='http://localhost:8888'>Login to Spotify </a> }
        { Object.keys(this.state.artistNode).length > 0 ? <TreeHome tree={this.state.tree} clickedNode={this.handleClick} /> : null }
      </div>
    );
  }
}

export default App;
